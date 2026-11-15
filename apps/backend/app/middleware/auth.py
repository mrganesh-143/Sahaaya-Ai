"""
app/middleware/auth.py – FastAPI auth dependencies for SAHAAYA.

Provides:
  - get_current_user()   – any authenticated user
  - get_current_admin()  – admin role only
  - get_current_partner() – partner role only
  - get_optional_user()  – user if authenticated, else None
"""
from __future__ import annotations

import logging
from typing import Optional
from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.database import supabase
from app.models.user import UserProfile

logger = logging.getLogger(__name__)

# HTTPBearer scheme (auto-401 when no header)
_bearer = HTTPBearer(auto_error=True)
_bearer_optional = HTTPBearer(auto_error=False)


async def _resolve_token(token: str) -> dict:
    """
    Verify a Supabase JWT and return the user dict.
    Raises HTTPException 401 on invalid/expired token.
    """
    try:
        response = supabase.auth.get_user(token)
        if response is None or response.user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired authentication token.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return response.user
    except HTTPException:
        raise
    except Exception as exc:
        logger.warning("Token verification failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials.",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def _get_profile(user_id: str) -> dict:
    """Fetch user profile from DB. Returns raw dict."""
    try:
        result = (
            supabase.table("profiles")
            .select("*")
            .eq("id", user_id)
            .single()
            .execute()
        )
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found.",
            )
        return result.data
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Error fetching profile for user %s: %s", user_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve user profile.",
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
) -> dict:
    """
    FastAPI dependency: validates Bearer token and returns the
    combined auth user + profile dict.
    """
    auth_user = await _resolve_token(credentials.credentials)
    profile = await _get_profile(str(auth_user.id))
    # Merge auth metadata with profile
    return {
        "id": auth_user.id,
        "email": auth_user.email,
        **profile,
    }


async def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer_optional),
) -> Optional[dict]:
    """
    FastAPI dependency: returns user dict if authenticated, else None.
    Does NOT raise if no token is present.
    """
    if credentials is None:
        return None
    try:
        return await get_current_user(credentials)
    except HTTPException:
        return None


async def get_current_admin(
    current_user: dict = Depends(get_current_user),
) -> dict:
    """
    FastAPI dependency: ensures the current user has the 'admin' role.
    """
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access required.",
        )
    return current_user


async def get_current_partner(
    current_user: dict = Depends(get_current_user),
) -> dict:
    """
    FastAPI dependency: ensures the current user has 'partner' or 'admin' role.
    """
    role = current_user.get("role")
    if role not in {"partner", "admin"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Business partner access required.",
        )
    return current_user
