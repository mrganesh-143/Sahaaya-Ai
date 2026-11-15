"""
app/routers/partners.py – Business Partner Portal, Seller Registration, Catalog & Analytics.
"""
from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status

from app.database import supabase
from app.middleware.auth import get_current_user, get_current_partner
from app.models.partner import SellerCreate, OfferCreate

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_partner(partner_in: SellerCreate, current_user: dict = Depends(get_current_user)):
    """Register as a local MSME or community seller on SAHAAYA."""
    seller_data = {
        "user_id": current_user["id"],
        "business_name": partner_in.business_name,
        "gst_number": partner_in.gst_number,
        "address": partner_in.address,
        "city": partner_in.state, # default city / region
        "state": partner_in.state,
        "verification_status": "pending"
    }
    res = supabase.table("sellers").insert(seller_data).execute()
    if not res.data:
        raise HTTPException(status_code=400, detail="Could not register seller profile.")
    
    # Update profile role to partner
    supabase.table("profiles").update({"role": "partner"}).eq("id", current_user["id"]).execute()
    
    return {"message": "Partner application submitted successfully. Verification pending.", "seller": res.data[0]}

@router.get("/dashboard")
async def get_partner_dashboard(current_user: dict = Depends(get_current_user)):
    """Retrieve seller metrics, inventory summary, and active orders."""
    seller_res = supabase.table("sellers").select("*").eq("user_id", current_user["id"]).single().execute()
    if not seller_res.data:
        raise HTTPException(status_code=404, detail="Partner account not found.")
    
    seller = seller_res.data
    products_res = supabase.table("products").select("id, name, stock_quantity, discounted_price, is_active").eq("seller_id", seller["id"]).execute()
    offers_res = supabase.table("offers").select("*").eq("seller_id", seller["id"]).execute()
    
    return {
        "seller": seller,
        "total_products": len(products_res.data or []),
        "active_offers": len(offers_res.data or []),
        "products": products_res.data or [],
        "offers": offers_res.data or []
    }

@router.post("/products", status_code=status.HTTP_201_CREATED)
async def add_product(payload: dict, current_user: dict = Depends(get_current_user)):
    """Add a new product listing for community sale."""
    seller_res = supabase.table("sellers").select("id, verification_status").eq("user_id", current_user["id"]).single().execute()
    if not seller_res.data:
        raise HTTPException(status_code=403, detail="Partner profile required.")
    
    payload["seller_id"] = seller_res.data["id"]
    payload["is_moderated"] = True # Set to auto-moderated in prototype mode
    res = supabase.table("products").insert(payload).execute()
    if not res.data:
        raise HTTPException(status_code=400, detail="Could not add product.")
    return res.data[0]

@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: UUID, current_user: dict = Depends(get_current_user)):
    """Remove a product listing."""
    seller_res = supabase.table("sellers").select("id").eq("user_id", current_user["id"]).single().execute()
    if not seller_res.data:
        raise HTTPException(status_code=403, detail="Unauthorized.")
    supabase.table("products").delete().eq("id", str(product_id)).eq("seller_id", seller_res.data["id"]).execute()
    return None
