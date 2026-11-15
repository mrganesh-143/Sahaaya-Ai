"""
app/routers/savings.py – Family Savings Dashboard, Budget & Expense Tracking.
"""
from datetime import datetime, date
from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.database import supabase
from app.middleware.auth import get_current_user
from app.models.savings import (
    SavingsGoalCreate, SavingsGoalUpdate, SavingsGoalResponse,
    BudgetCreate, BudgetResponse, ExpenseCreate, ExpenseResponse,
    SavingsSummaryResponse
)

router = APIRouter()

# ----------------- SAVINGS GOALS -----------------
@router.get("/goals", response_model=List[SavingsGoalResponse])
async def list_savings_goals(current_user: dict = Depends(get_current_user)):
    """List all savings goals for the authenticated user."""
    res = supabase.table("savings_goals").select("*").eq("user_id", current_user["id"]).order("created_at", desc=True).execute()
    return res.data or []

@router.post("/goals", response_model=SavingsGoalResponse, status_code=status.HTTP_201_CREATED)
async def create_savings_goal(goal_in: SavingsGoalCreate, current_user: dict = Depends(get_current_user)):
    """Create a new savings goal."""
    data = goal_in.model_dump()
    data["user_id"] = current_user["id"]
    if "target_date" in data and data["target_date"]:
        data["deadline"] = str(data.pop("target_date"))
    res = supabase.table("savings_goals").insert(data).execute()
    if not res.data:
        raise HTTPException(status_code=400, detail="Failed to create savings goal.")
    row = res.data[0]
    row["target_date"] = row.get("deadline")
    return row

@router.put("/goals/{goal_id}", response_model=SavingsGoalResponse)
async def update_savings_goal(goal_id: UUID, goal_in: SavingsGoalUpdate, current_user: dict = Depends(get_current_user)):
    """Update an existing savings goal."""
    update_data = goal_in.model_dump(exclude_unset=True)
    if "target_date" in update_data and update_data["target_date"]:
        update_data["deadline"] = str(update_data.pop("target_date"))
    res = supabase.table("savings_goals").update(update_data).eq("id", str(goal_id)).eq("user_id", current_user["id"]).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Savings goal not found or unauthorized.")
    row = res.data[0]
    row["target_date"] = row.get("deadline")
    return row

@router.delete("/goals/{goal_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_savings_goal(goal_id: UUID, current_user: dict = Depends(get_current_user)):
    """Delete a savings goal."""
    res = supabase.table("savings_goals").delete().eq("id", str(goal_id)).eq("user_id", current_user["id"]).execute()
    return None

# ----------------- BUDGET -----------------
@router.get("/budget", response_model=Optional[BudgetResponse])
async def get_monthly_budget(
    month: int = Query(default=datetime.utcnow().month, ge=1, le=12),
    year: int = Query(default=datetime.utcnow().year, ge=2024),
    current_user: dict = Depends(get_current_user)
):
    """Retrieve monthly budget for the given month and year."""
    res = supabase.table("budgets").select("*").eq("user_id", current_user["id"]).eq("month", month).eq("year", year).execute()
    if not res.data:
        return None
    return res.data[0]

@router.post("/budget", response_model=BudgetResponse)
async def set_monthly_budget(budget_in: BudgetCreate, current_user: dict = Depends(get_current_user)):
    """Set or update monthly budget."""
    data = budget_in.model_dump()
    data["user_id"] = current_user["id"]
    res = supabase.table("budgets").upsert(data, on_conflict="user_id,month,year").execute()
    if not res.data:
        raise HTTPException(status_code=400, detail="Failed to save budget.")
    return res.data[0]

# ----------------- EXPENSES -----------------
@router.get("/expenses", response_model=List[ExpenseResponse])
async def list_expenses(
    month: Optional[int] = Query(None, ge=1, le=12),
    year: Optional[int] = Query(None, ge=2024),
    category: Optional[str] = None,
    limit: int = Query(default=50, le=100),
    current_user: dict = Depends(get_current_user)
):
    """List expenses with optional category and month filtering."""
    query = supabase.table("expenses").select("*").eq("user_id", current_user["id"])
    if category:
        query = query.eq("category", category)
    query = query.order("expense_date", desc=True).limit(limit)
    res = query.execute()
    return res.data or []

@router.post("/expenses", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
async def create_expense(expense_in: ExpenseCreate, current_user: dict = Depends(get_current_user)):
    """Log an expense."""
    data = expense_in.model_dump()
    data["user_id"] = current_user["id"]
    if "expense_date" in data and data["expense_date"]:
        data["expense_date"] = str(data["expense_date"])
    res = supabase.table("expenses").insert(data).execute()
    if not res.data:
        raise HTTPException(status_code=400, detail="Failed to log expense.")
    return res.data[0]

@router.delete("/expenses/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(expense_id: UUID, current_user: dict = Depends(get_current_user)):
    """Delete an expense record."""
    supabase.table("expenses").delete().eq("id", str(expense_id)).eq("user_id", current_user["id"]).execute()
    return None

# ----------------- SUMMARY -----------------
@router.get("/summary", response_model=SavingsSummaryResponse)
async def get_savings_summary(current_user: dict = Depends(get_current_user)):
    """Comprehensive dashboard summary: total saved, budget remaining, category breakdown."""
    now = datetime.utcnow()
    # 1. Budget
    budget_res = supabase.table("budgets").select("*").eq("user_id", current_user["id"]).eq("month", now.month).eq("year", now.year).execute()
    total_budget = budget_res.data[0]["total_budget"] if budget_res.data else 0.0

    # 2. Expenses this month
    start_date = f"{now.year}-{now.month:02d}-01"
    expenses_res = supabase.table("expenses").select("amount, category").eq("user_id", current_user["id"]).gte("expense_date", start_date).execute()
    
    total_spent = 0.0
    category_spending = {}
    for exp in (expenses_res.data or []):
        amt = float(exp["amount"])
        cat = exp["category"]
        total_spent += amt
        category_spending[cat] = category_spending.get(cat, 0.0) + amt

    # 3. Goals total saved
    goals_res = supabase.table("savings_goals").select("current_amount, target_amount").eq("user_id", current_user["id"]).execute()
    total_saved = sum(float(g["current_amount"]) for g in (goals_res.data or []))
    total_goals_target = sum(float(g["target_amount"]) for g in (goals_res.data or []))

    savings_rate = 0.0
    if total_budget > 0:
        savings_rate = round(max(0.0, (total_budget - total_spent) / total_budget * 100), 2)

    return SavingsSummaryResponse(
        month=now.month,
        year=now.year,
        total_budget=total_budget,
        total_spent=round(total_spent, 2),
        budget_remaining=round(max(0.0, total_budget - total_spent), 2),
        total_saved_all_time=round(total_saved, 2),
        total_goals_target=round(total_goals_target, 2),
        active_goals_count=len(goals_res.data or []),
        savings_rate_percentage=savings_rate,
        category_spending=category_spending,
        smart_savings_tip="Buying staples in 5kg community bulk packs on Sahaaya Marketplace saves an average of ₹340 per month!"
    )
