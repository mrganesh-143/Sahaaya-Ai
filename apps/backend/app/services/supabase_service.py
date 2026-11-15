"""
app/services/supabase_service.py – Higher-level Supabase helper functions.
"""
from __future__ import annotations

import logging
from typing import Optional
from uuid import UUID

from fastapi import HTTPException, status

from app.database import supabase, supabase_anon
from app.models.user import UserProfile

logger = logging.getLogger(__name__)


async def verify_jwt(token: str) -> dict:
    """
    Verify a Supabase JWT and return the auth user object.
    Raises HTTPException 401 on failure.
    """
    try:
        response = supabase.auth.get_user(token)
        if response is None or response.user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token.",
            )
        return response.user
    except HTTPException:
        raise
    except Exception as exc:
        logger.warning("JWT verification error: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token verification failed.",
        )


async def get_user_by_id(user_id: str | UUID) -> Optional[dict]:
    """
    Fetch a user profile by ID from the profiles table.
    Returns None if not found.
    """
    try:
        result = (
            supabase.table("profiles")
            .select("*")
            .eq("id", str(user_id))
            .single()
            .execute()
        )
        return result.data
    except Exception as exc:
        logger.error("get_user_by_id(%s) error: %s", user_id, exc)
        return None


async def get_user_profile(user_id: str | UUID) -> dict:
    """
    Fetch a user profile. Raises 404 if not found.
    """
    profile = await get_user_by_id(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found.",
        )
    return profile


async def create_profile(
    user_id: str | UUID,
    full_name: str,
    email: str,
    phone: Optional[str] = None,
    role: str = "family",
    language_preference: str = "en",
    state: Optional[str] = None,
) -> dict:
    """
    Insert a new profile record into the profiles table.
    Returns the created profile dict.
    Raises HTTPException on failure.
    """
    payload = {
        "id": str(user_id),
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "role": role,
        "language_preference": language_preference,
        "state": state,
        "is_verified": False,
    }
    try:
        result = supabase.table("profiles").insert(payload).execute()
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user profile.",
            )
        return result.data[0]
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("create_profile error for %s: %s", user_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error while creating profile.",
        )


async def update_profile(user_id: str | UUID, updates: dict) -> dict:
    """
    Update a user profile by ID.
    Returns the updated profile dict.
    Raises HTTPException on failure.
    """
    # Remove None values
    updates = {k: v for k, v in updates.items() if v is not None}
    if not updates:
        return await get_user_profile(user_id)

    try:
        result = (
            supabase.table("profiles")
            .update(updates)
            .eq("id", str(user_id))
            .execute()
        )
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found.",
            )
        return result.data[0]
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("update_profile error for %s: %s", user_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error while updating profile.",
        )


async def log_audit_event(
    action: str,
    actor_id: Optional[str] = None,
    target_id: Optional[str] = None,
    target_type: Optional[str] = None,
    metadata: Optional[dict] = None,
) -> None:
    """
    Insert an entry into the audit_logs table.
    Silently fails to avoid disrupting the main request.
    """
    try:
        supabase.table("audit_logs").insert({
            "action": action,
            "actor_id": actor_id,
            "target_id": target_id,
            "target_type": target_type,
            "metadata": metadata or {},
        }).execute()
    except Exception as exc:
        logger.warning("audit log insert failed: %s", exc)
