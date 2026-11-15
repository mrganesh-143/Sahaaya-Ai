"""
app/routers/youth.py – Youth Development, Skills, Free Courses, Internships & Employment.
"""
from datetime import datetime
from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.database import supabase
from app.middleware.auth import get_current_user, get_optional_user

router = APIRouter()

# ----------------- COURSES -----------------
@router.get("/courses")
async def list_courses(
    category: Optional[str] = None,
    level: Optional[str] = None,
    is_free: Optional[bool] = None,
    query: Optional[str] = None
):
    """List accessible courses designed for Indian youth upskilling."""
    builder = supabase.table("courses").select("*").eq("is_active", True)
    if category:
        builder = builder.eq("category", category)
    if level:
        builder = builder.eq("level", level)
    if is_free is not None:
        builder = builder.eq("is_free", is_free)
    if query:
        builder = builder.ilike("title", f"%{query}%")
    res = builder.execute()
    return res.data or []

@router.get("/courses/{course_id}")
async def get_course_detail(course_id: UUID):
    """Retrieve full course outline, syllabus, and instructor details."""
    res = supabase.table("courses").select("*").eq("id", str(course_id)).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Course not found.")
    return res.data

@router.post("/courses/{course_id}/enroll", status_code=status.HTTP_201_CREATED)
async def enroll_course(course_id: UUID, current_user: dict = Depends(get_current_user)):
    """Enroll authenticated youth into a skill development course."""
    enrollment = {
        "user_id": current_user["id"],
        "course_id": str(course_id),
        "progress_percentage": 0
    }
    res = supabase.table("enrollments").upsert(enrollment, on_conflict="user_id,course_id").execute()
    if not res.data:
        raise HTTPException(status_code=400, detail="Could not complete enrollment.")
    return {"message": "Enrolled successfully!", "enrollment": res.data[0]}

@router.get("/my-learning")
async def get_my_learning(current_user: dict = Depends(get_current_user)):
    """View active enrolled courses and completion certificates."""
    res = supabase.table("enrollments").select("*, courses(*)").eq("user_id", current_user["id"]).execute()
    return res.data or []

# ----------------- JOBS & INTERNSHIPS -----------------
@router.get("/jobs")
async def list_jobs(
    type: Optional[str] = None,
    is_remote: Optional[bool] = None,
    query: Optional[str] = None
):
    """Browse entry-level jobs and internships for youth across India."""
    builder = supabase.table("jobs").select("*").eq("is_active", True)
    if type:
        builder = builder.eq("type", type)
    if is_remote is not None:
        builder = builder.eq("is_remote", is_remote)
    if query:
        builder = builder.ilike("title", f"%{query}%")
    res = builder.order("created_at", desc=True).execute()
    return res.data or []

# ----------------- SCHOLARSHIPS -----------------
@router.get("/scholarships")
async def list_scholarships():
    """Browse government and community verified scholarship opportunities."""
    res = supabase.table("scholarships").select("*").eq("is_active", True).order("deadline").execute()
    return res.data or []
