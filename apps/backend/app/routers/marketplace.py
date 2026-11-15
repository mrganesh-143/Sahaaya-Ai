"""
app/routers/marketplace.py – Affordable Marketplace for Essentials, Groceries & Community Offers.
"""
from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.database import supabase
from app.middleware.auth import get_current_user
from app.models.marketplace import (
    ProductCreate, ProductResponse, CartItem, OrderCreate, OrderResponse
)

router = APIRouter()

@router.get("/products")
async def list_products(
    query: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    verified_only: bool = False,
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, le=50)
):
    """Search and filter affordable products on SAHAAYA Marketplace."""
    offset = (page - 1) * limit
    builder = supabase.table("products").select("*, categories(name, slug), sellers(business_name, rating, verification_status)")
    builder = builder.eq("is_active", True)

    if query:
        builder = builder.ilike("name", f"%{query}%")
    if category:
        builder = builder.eq("category_id", category)
    if min_price is not None:
        builder = builder.gte("discounted_price", min_price)
    if max_price is not None:
        builder = builder.lte("discounted_price", max_price)

    builder = builder.range(offset, offset + limit - 1)
    res = builder.execute()
    return {
        "page": page,
        "limit": limit,
        "products": res.data or []
    }

@router.get("/products/{product_id}")
async def get_product_detail(product_id: UUID):
    """Retrieve complete product details with seller credentials."""
    res = supabase.table("products").select("*, categories(name, slug), sellers(business_name, rating, city, state, verification_status)").eq("id", str(product_id)).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Product not found.")
    return res.data

@router.get("/categories")
async def list_categories():
    """Retrieve all available marketplace categories."""
    res = supabase.table("categories").select("*").eq("is_active", True).order("sort_order").execute()
    return res.data or []

@router.get("/offers")
async def list_offers():
    """Retrieve active promotional and community discount offers."""
    res = supabase.table("offers").select("*, products(name, discounted_price, images), sellers(business_name)").eq("is_active", True).execute()
    return res.data or []

# ----------------- CART & ORDERS -----------------
@router.post("/orders", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_order(order_in: OrderCreate, current_user: dict = Depends(get_current_user)):
    """
    Initiate an order with compliant payment integration architecture (e.g. Razorpay).
    Real payments enabled after enterprise compliance and merchant onboarding.
    """
    total_amount = sum(item.price * item.quantity for item in order_in.items)
    order_data = {
        "user_id": current_user["id"],
        "status": "pending",
        "total_amount": round(total_amount, 2),
        "payment_status": "pending",
        "payment_provider": "razorpay_architecture",
        "delivery_address": order_in.delivery_address.model_dump() if hasattr(order_in.delivery_address, "model_dump") else order_in.delivery_address
    }
    
    order_res = supabase.table("orders").insert(order_data).execute()
    if not order_res.data:
        raise HTTPException(status_code=400, detail="Failed to initialize order.")
    
    created_order = order_res.data[0]
    
    # Insert order items
    items_to_insert = [
        {
            "order_id": created_order["id"],
            "product_id": str(item.product_id),
            "quantity": item.quantity,
            "unit_price": item.price,
            "discount_applied": getattr(item, "discount", 0.0)
        }
        for item in order_in.items
    ]
    supabase.table("order_items").insert(items_to_insert).execute()

    return {
        "order": created_order,
        "payment_instruction": {
            "mode": "PROTOTYPE_MODE",
            "provider": "Razorpay (Architecture ready)",
            "message": "Payment pipeline prepared. Real transactions disabled until business and banking KYC verification are finalized.",
            "currency": "INR",
            "amount_in_paise": int(total_amount * 100)
        }
    }

@router.get("/orders/my")
async def get_user_orders(current_user: dict = Depends(get_current_user)):
    """List orders placed by the current user."""
    res = supabase.table("orders").select("*, order_items(*, products(name, images))").eq("user_id", current_user["id"]).order("created_at", desc=True).execute()
    return res.data or []
