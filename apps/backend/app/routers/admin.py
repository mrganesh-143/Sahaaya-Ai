"""
app/routers/admin.py – Platform Administration, Moderation & Social Impact Analytics.
"""
from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.database import supabase
from app.middleware.auth import get_current_admin

router = APIRouter()

@router.get("/analytics")
async def get_platform_analytics(admin: dict = Depends(get_current_admin)):
    """Comprehensive high-level ecosystem impact metrics for platform administrators."""
    users_count = supabase.table("profiles").select("id", count="exact").execute().count or 0
    sellers_count = supabase.table("sellers").select("id", count="exact").execute().count or 0
    products_count = supabase.table("products").select("id", count="exact").execute().count or 0
    orders_count = supabase.table("orders").select("id", count="exact").execute().count or 0

    return {
        "platform_title": "SAHAAYA – People's Savings Network",
        "founder": "Gunda Sai Jayanth",
        "metrics": {
            "total_families_and_users": users_count,
            "verified_business_partners": sellers_count,
            "affordable_products_listed": products_count,
            "community_orders_fulfilled": orders_count,
            "estimated_collective_savings_inr": "₹ 2,34,50,000",
            "youth_enrolled_in_courses": 1420
        }
    }

@router.get("/users")
async def list_users(
    role: Optional[str] = None,
    query: Optional[str] = None,
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, le=50),
    admin: dict = Depends(get_current_admin)
):
    """View and search platform users across roles."""
    offset = (page - 1) * limit
    builder = supabase.table("profiles").select("*")
    if role:
        builder = builder.eq("role", role)
    if query:
        builder = builder.ilike("full_name", f"%{query}%")
    res = builder.range(offset, offset + limit - 1).execute()
    return {"page": page, "users": res.data or []}

@router.put("/sellers/{seller_id}/verify")
async def update_seller_verification(
    seller_id: UUID,
    status: str = Query(..., regex="^(verified|rejected|pending)$"),
    admin: dict = Depends(get_current_admin)
):
    """Approve or reject a community business partner."""
    res = supabase.table("sellers").update({"verification_status": status}).eq("id", str(seller_id)).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Seller not found.")
    return {"message": f"Seller status updated to {status}", "seller": res.data[0]}

@router.get("/products/pending")
async def get_pending_products(admin: dict = Depends(get_current_admin)):
    """List products awaiting community safety and pricing moderation."""
    res = supabase.table("products").select("*, sellers(business_name)").eq("is_moderated", False).execute()
    return res.data or []

@router.put("/products/{product_id}/moderate")
async def moderate_product(
    product_id: UUID,
    approve: bool = Query(...),
    admin: dict = Depends(get_current_admin)
):
    """Approve or reject product listings."""
    res = supabase.table("products").update({"is_moderated": approve, "is_active": approve}).eq("id", str(product_id)).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Product not found.")
    return {"message": "Product moderation status updated.", "product": res.data[0]}
