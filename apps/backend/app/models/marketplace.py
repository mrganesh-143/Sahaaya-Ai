"""
app/models/marketplace.py – Pydantic v2 marketplace schemas for SAHAAYA.
"""
from __future__ import annotations

from datetime import datetime
from typing import List, Literal, Optional
from uuid import UUID

from pydantic import BaseModel, Field, field_validator, model_config

ProductCategory = Literal[
    "Groceries", "Pulses & Grains", "Vegetables & Fruits", "Dairy",
    "Oil & Spices", "Personal Care", "Household", "Education",
    "Healthcare", "Clothing", "Electronics", "Stationery", "Other"
]

OrderStatus = Literal[
    "draft", "pending_payment", "payment_confirmed", "processing",
    "shipped", "delivered", "cancelled", "refunded"
]


class ProductCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    name: str = Field(..., min_length=2, max_length=200)
    description: str = Field(..., min_length=10, max_length=2000)
    category: ProductCategory
    price: float = Field(..., gt=0, description="Price in ₹")
    mrp: Optional[float] = Field(None, gt=0, description="MRP in ₹")
    stock_quantity: int = Field(..., ge=0)
    unit: str = Field(default="piece", max_length=50)  # kg, litre, piece, pack
    images: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    is_organic: bool = False
    is_local_produce: bool = False

    @field_validator("price", "mrp")
    @classmethod
    def round_price(cls, v: Optional[float]) -> Optional[float]:
        if v is not None:
            return round(v, 2)
        return v


class ProductResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    seller_id: UUID
    name: str
    description: str
    category: str
    price: float
    mrp: Optional[float] = None
    discount_percent: Optional[float] = None
    stock_quantity: int
    unit: str
    images: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    is_organic: bool
    is_local_produce: bool
    is_verified: bool
    is_active: bool
    rating: Optional[float] = None
    review_count: int = 0
    seller_name: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class ProductSearch(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    query: Optional[str] = None
    category: Optional[ProductCategory] = None
    min_price: Optional[float] = Field(None, ge=0)
    max_price: Optional[float] = Field(None, gt=0)
    verified_only: bool = False
    organic_only: bool = False
    local_only: bool = False
    sort_by: Literal["price_asc", "price_desc", "newest", "rating"] = "newest"
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=20, ge=1, le=100)


class CartItem(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    product_id: UUID
    quantity: int = Field(..., ge=1)


class CartItemResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    product_id: UUID
    product_name: str
    product_image: Optional[str] = None
    unit_price: float
    quantity: int
    subtotal: float
    seller_name: Optional[str] = None
    is_in_stock: bool = True


class CartResponse(BaseModel):
    items: List[CartItemResponse] = []
    total_items: int = 0
    subtotal: float = 0.0
    estimated_savings: float = 0.0
    session_id: str


class OrderCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    delivery_address: str = Field(..., min_length=10, max_length=500)
    delivery_state: str
    delivery_pincode: str
    contact_phone: str
    notes: Optional[str] = Field(None, max_length=300)

    @field_validator("delivery_pincode")
    @classmethod
    def validate_pincode(cls, v: str) -> str:
        import re
        if not re.match(r"^\d{6}$", v):
            raise ValueError("Invalid Indian pincode. Must be 6 digits.")
        return v


class OrderResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    order_number: str
    user_id: UUID
    items: List[CartItemResponse] = []
    total_amount: float
    delivery_address: str
    delivery_state: str
    delivery_pincode: str
    contact_phone: str
    status: OrderStatus
    payment_reference: Optional[str] = None
    notes: Optional[str] = None
    # Architecture note: Razorpay integration pending compliance approval.
    # payment_link will be populated once compliance is cleared.
    payment_link: Optional[str] = None
    razorpay_order_id: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
