"""
app/models/partner.py – Pydantic v2 partner/seller schemas for SAHAAYA.
"""
from __future__ import annotations

from datetime import datetime
from typing import List, Literal, Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator, model_config

import re

BusinessType = Literal[
    "individual", "proprietorship", "partnership", "private_limited",
    "ngo", "cooperative", "self_help_group"
]
SellerStatus = Literal["pending", "approved", "rejected", "suspended"]
OfferType = Literal["percentage", "flat", "buy_x_get_y", "combo"]


class SellerCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    business_name: str = Field(..., min_length=2, max_length=200)
    business_type: BusinessType
    owner_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str
    address: str = Field(..., min_length=10, max_length=500)
    state: str
    pincode: str
    gst_number: Optional[str] = None
    pan_number: Optional[str] = None
    bank_account_number: Optional[str] = None
    bank_ifsc: Optional[str] = None
    description: Optional[str] = Field(None, max_length=1000)
    product_categories: List[str] = []

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        from app.models.user import validate_indian_phone
        return validate_indian_phone(v)

    @field_validator("pincode")
    @classmethod
    def validate_pincode(cls, v: str) -> str:
        if not re.match(r"^\d{6}$", v):
            raise ValueError("Invalid Indian pincode. Must be 6 digits.")
        return v

    @field_validator("gst_number")
    @classmethod
    def validate_gst(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            if not re.match(r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$", v):
                raise ValueError("Invalid GST number format.")
        return v

    @field_validator("pan_number")
    @classmethod
    def validate_pan(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            if not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$", v):
                raise ValueError("Invalid PAN number format.")
        return v

    @field_validator("bank_ifsc")
    @classmethod
    def validate_ifsc(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            if not re.match(r"^[A-Z]{4}0[A-Z0-9]{6}$", v):
                raise ValueError("Invalid IFSC code format.")
        return v


class SellerResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    user_id: UUID
    business_name: str
    business_type: str
    owner_name: str
    email: str
    phone: str
    address: str
    state: str
    pincode: str
    description: Optional[str] = None
    product_categories: List[str] = []
    status: SellerStatus
    is_verified: bool = False
    rating: Optional[float] = None
    total_products: int = 0
    total_orders: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None


class SellerDashboardResponse(BaseModel):
    seller: SellerResponse
    total_revenue: float = 0.0
    total_orders: int = 0
    pending_orders: int = 0
    total_products: int = 0
    active_products: int = 0
    this_month_revenue: float = 0.0
    this_month_orders: int = 0
    top_products: List[dict] = []


class OfferCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    title: str = Field(..., min_length=2, max_length=200)
    description: Optional[str] = Field(None, max_length=500)
    offer_type: OfferType
    discount_value: float = Field(..., gt=0)
    min_order_amount: Optional[float] = Field(None, ge=0)
    max_discount_amount: Optional[float] = Field(None, gt=0)
    applicable_product_ids: Optional[List[UUID]] = None  # None = all products
    valid_from: datetime
    valid_until: datetime
    usage_limit: Optional[int] = Field(None, gt=0)
    coupon_code: Optional[str] = Field(None, max_length=20)

    @field_validator("coupon_code")
    @classmethod
    def validate_coupon(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            v = v.upper().strip()
            if not re.match(r"^[A-Z0-9]{3,20}$", v):
                raise ValueError("Coupon code must be 3-20 alphanumeric characters.")
        return v


class OfferResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    seller_id: UUID
    title: str
    description: Optional[str] = None
    offer_type: str
    discount_value: float
    min_order_amount: Optional[float] = None
    max_discount_amount: Optional[float] = None
    coupon_code: Optional[str] = None
    valid_from: datetime
    valid_until: datetime
    usage_limit: Optional[int] = None
    usage_count: int = 0
    is_active: bool = True
    created_at: datetime
