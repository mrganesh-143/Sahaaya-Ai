"""
app/models/savings.py – Pydantic v2 savings schemas for SAHAAYA.
"""
from __future__ import annotations

from datetime import date, datetime
from typing import Dict, List, Literal, Optional
from uuid import UUID

from pydantic import BaseModel, Field, field_validator, model_config

ExpenseCategory = Literal[
    "Groceries", "Pulses & Grains", "Vegetables & Fruits", "Dairy",
    "Oil & Spices", "Personal Care", "Household", "Education",
    "Healthcare", "Transport", "Entertainment", "Clothing", "Utilities",
    "Mobile & Internet", "EMI & Loans", "Savings Transfer", "Other"
]

GoalStatus = Literal["active", "completed", "paused", "cancelled"]


class SavingsGoalCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    title: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    target_amount: float = Field(..., gt=0, description="Target amount in ₹")
    current_amount: float = Field(default=0.0, ge=0)
    target_date: Optional[date] = None
    icon: Optional[str] = None  # emoji or icon name

    @field_validator("target_amount", "current_amount")
    @classmethod
    def round_currency(cls, v: float) -> float:
        return round(v, 2)


class SavingsGoalUpdate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    title: Optional[str] = Field(None, min_length=2, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    target_amount: Optional[float] = Field(None, gt=0)
    current_amount: Optional[float] = Field(None, ge=0)
    target_date: Optional[date] = None
    status: Optional[GoalStatus] = None
    icon: Optional[str] = None


class SavingsGoalResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    user_id: UUID
    title: str
    description: Optional[str] = None
    target_amount: float
    current_amount: float
    target_date: Optional[date] = None
    status: GoalStatus
    icon: Optional[str] = None
    progress_percent: float = 0.0
    created_at: datetime
    updated_at: Optional[datetime] = None


class BudgetCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    month: int = Field(..., ge=1, le=12, description="Month (1-12)")
    year: int = Field(..., ge=2020, le=2100)
    total_budget: float = Field(..., gt=0, description="Total monthly budget in ₹")
    category_budgets: Optional[Dict[str, float]] = None  # category -> amount

    @field_validator("total_budget")
    @classmethod
    def round_budget(cls, v: float) -> float:
        return round(v, 2)


class BudgetResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    user_id: UUID
    month: int
    year: int
    total_budget: float
    category_budgets: Optional[Dict[str, float]] = None
    total_spent: float = 0.0
    remaining: float = 0.0
    usage_percent: float = 0.0
    created_at: datetime
    updated_at: Optional[datetime] = None


class ExpenseCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    amount: float = Field(..., gt=0, description="Amount in ₹")
    category: ExpenseCategory
    description: Optional[str] = Field(None, max_length=300)
    expense_date: date = Field(default_factory=date.today)
    merchant: Optional[str] = Field(None, max_length=100)
    tags: Optional[List[str]] = None

    @field_validator("amount")
    @classmethod
    def round_amount(cls, v: float) -> float:
        return round(v, 2)


class ExpenseResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    user_id: UUID
    amount: float
    category: str
    description: Optional[str] = None
    expense_date: date
    merchant: Optional[str] = None
    tags: Optional[List[str]] = None
    created_at: datetime


class CategoryBreakdown(BaseModel):
    category: str
    amount: float
    percent: float
    transaction_count: int


class SavingsSummaryResponse(BaseModel):
    total_saved: float
    total_goals: int
    active_goals: int
    completed_goals: int
    current_month_budget: Optional[float] = None
    current_month_spent: float = 0.0
    budget_used_percent: float = 0.0
    budget_remaining: Optional[float] = None
    category_breakdown: List[CategoryBreakdown] = []
    top_expense_category: Optional[str] = None
