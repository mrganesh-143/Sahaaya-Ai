"""
app/models/user.py – Pydantic v2 user schemas for SAHAAYA.
"""
from __future__ import annotations

import re
from datetime import datetime
from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, field_validator, model_config

INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
]

UserRole = Literal["family", "youth", "partner", "admin"]
LanguagePreference = Literal["en", "te", "hi"]


def validate_indian_phone(v: str) -> str:
    """Validate Indian mobile number (+91XXXXXXXXXX or 10 digits)."""
    cleaned = re.sub(r"[\s\-()]", "", v)
    if cleaned.startswith("+91"):
        cleaned = cleaned[3:]
    elif cleaned.startswith("91") and len(cleaned) == 12:
        cleaned = cleaned[2:]
    if not re.match(r"^[6-9]\d{9}$", cleaned):
        raise ValueError("Invalid Indian phone number. Must be 10 digits starting with 6-9.")
    return f"+91{cleaned}"


class UserCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    full_name: str
    email: EmailStr
    phone: str
    password: str
    role: UserRole = "family"
    language_preference: LanguagePreference = "en"
    state: Optional[str] = None

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError("Full name must be at least 2 characters.")
        if len(v.strip()) > 100:
            raise ValueError("Full name must be at most 100 characters.")
        return v.strip()

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        return validate_indian_phone(v)

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters.")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit.")
        return v

    @field_validator("state")
    @classmethod
    def validate_state(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in INDIAN_STATES:
            raise ValueError(f"Invalid Indian state: {v}")
        return v


class UserLogin(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    email: EmailStr
    password: str


class UserProfile(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    role: UserRole
    language_preference: LanguagePreference
    state: Optional[str] = None
    avatar_url: Optional[str] = None
    is_verified: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None


class UserUpdate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    full_name: Optional[str] = None
    phone: Optional[str] = None
    state: Optional[str] = None
    language_preference: Optional[LanguagePreference] = None
    avatar_url: Optional[str] = None

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            if len(v.strip()) < 2:
                raise ValueError("Full name must be at least 2 characters.")
            return v.strip()
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            return validate_indian_phone(v)
        return v

    @field_validator("state")
    @classmethod
    def validate_state(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in INDIAN_STATES:
            raise ValueError(f"Invalid Indian state: {v}")
        return v


class UserResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    success: bool = True
    message: str
    data: Optional[UserProfile] = None


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class RoleUpdateRequest(BaseModel):
    role: UserRole
