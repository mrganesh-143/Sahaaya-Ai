"""
app/routers/auth.py – Authentication endpoints for SAHAAYA.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import UserCreate, UserLogin, UserProfile, UserResponse, UserUpdate
from app.database import supabase, supabase_anon
from app.middleware.auth import get_current_user
from app.services import supabase_service

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate):
    """Register a new user account with Supabase Auth and generate public profile."""
    try:
        # Create user in Supabase Auth
        auth_resp = supabase_anon.auth.sign_up({
            "email": user_in.email,
            "password": user_in.password,
            "options": {
                "data": {
                    "full_name": user_in.full_name,
                    "phone": user_in.phone,
                    "role": user_in.role,
                    "language_preference": user_in.language_preference,
                    "state": user_in.state
                }
            }
        })

        if not auth_resp.user:
            raise HTTPException(status_code=400, detail="Registration failed. Check user details.")

        user_id = auth_resp.user.id
        
        # Ensure profile exists in profiles table
        profile = await supabase_service.get_user_profile(user_id)
        if not profile:
            profile = await supabase_service.create_profile({
                "id": user_id,
                "full_name": user_in.full_name,
                "phone": user_in.phone,
                "role": user_in.role,
                "language_preference": user_in.language_preference,
                "state": user_in.state
            })

        return UserResponse(
            id=user_id,
            email=user_in.email,
            profile=UserProfile(**profile),
            access_token=auth_resp.session.access_token if auth_resp.session else None,
            token_type="bearer"
        )
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(credentials: UserLogin):
    """Authenticate with email and password via Supabase."""
    try:
        auth_resp = supabase_anon.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password
        })

        if not auth_resp.session:
            raise HTTPException(status_code=401, detail="Invalid credentials.")

        profile = await supabase_service.get_user_profile(auth_resp.user.id)

        return {
            "access_token": auth_resp.session.access_token,
            "refresh_token": auth_resp.session.refresh_token,
            "token_type": "bearer",
            "user": {
                "id": auth_resp.user.id,
                "email": auth_resp.user.email,
                "profile": profile
            }
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=401, detail="Authentication failed. Invalid email or password.")

@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """Sign out current user."""
    return {"message": "Logged out successfully."}

@router.post("/forgot-password")
async def forgot_password(payload: dict):
    """Send password reset email to user."""
    email = payload.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required.")
    try:
        supabase_anon.auth.reset_password_email(email)
        return {"message": "If an account exists with this email, a reset link has been dispatched."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me", response_model=UserProfile)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Fetch profile information for authenticated user."""
    profile = await supabase_service.get_user_profile(current_user["id"])
    return UserProfile(**profile)

@router.put("/me", response_model=UserProfile)
async def update_me(update_data: UserUpdate, current_user: dict = Depends(get_current_user)):
    """Update profile information for authenticated user."""
    updated = await supabase_service.update_profile(
        current_user["id"],
        update_data.model_dump(exclude_unset=True)
    )
    return UserProfile(**updated)
