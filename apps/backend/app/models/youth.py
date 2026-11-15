"""
app/models/youth.py – Pydantic v2 youth portal schemas for SAHAAYA.
"""
from __future__ import annotations

from datetime import datetime
from typing import List, Literal, Optional
from uuid import UUID

from pydantic import BaseModel, Field, HttpUrl, model_config

CourseLevel = Literal["beginner", "intermediate", "advanced"]
CourseCategory = Literal[
    "Financial Literacy", "Digital Skills", "Vocational Training",
    "Entrepreneurship", "Agriculture", "Healthcare", "Government Schemes",
    "English Communication", "Computer Basics", "Other"
]
JobType = Literal["full_time", "part_time", "internship", "apprenticeship", "freelance"]
ScholarshipType = Literal["merit", "need_based", "category", "sports", "disability", "other"]


class CourseResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    title: str
    description: str
    category: str
    level: CourseLevel
    duration_hours: Optional[float] = None
    is_free: bool = True
    price: Optional[float] = None
    language: str = "en"
    instructor_name: Optional[str] = None
    thumbnail_url: Optional[str] = None
    enrolled_count: int = 0
    rating: Optional[float] = None
    tags: Optional[List[str]] = None
    is_certified: bool = False
    created_at: datetime


class CourseDetailResponse(CourseResponse):
    syllabus: Optional[List[str]] = None
    prerequisites: Optional[List[str]] = None
    what_you_learn: Optional[List[str]] = None
    total_lessons: int = 0
    video_url: Optional[str] = None


class JobResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    title: str
    company: str
    location: str
    state: Optional[str] = None
    job_type: JobType
    description: str
    requirements: Optional[List[str]] = None
    stipend_min: Optional[float] = None
    stipend_max: Optional[float] = None
    is_remote: bool = False
    application_deadline: Optional[datetime] = None
    apply_url: Optional[str] = None
    posted_by: Optional[str] = None
    is_verified: bool = False
    created_at: datetime


class ScholarshipResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    name: str
    provider: str
    description: str
    scholarship_type: ScholarshipType
    amount: Optional[float] = None
    is_renewable: bool = False
    eligibility: Optional[List[str]] = None
    eligible_states: Optional[List[str]] = None
    eligible_categories: Optional[List[str]] = None
    min_percentage: Optional[float] = None
    application_deadline: Optional[datetime] = None
    apply_url: Optional[str] = None
    is_government: bool = False
    created_at: datetime


class EnrollmentCreate(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    course_id: UUID


class EnrollmentResponse(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    user_id: UUID
    course_id: UUID
    course_title: str
    enrolled_at: datetime
    progress_percent: float = 0.0
    is_completed: bool = False
    completed_at: Optional[datetime] = None
    certificate_url: Optional[str] = None


class MyLearningResponse(BaseModel):
    enrollments: List[EnrollmentResponse] = []
    total_enrolled: int = 0
    completed_courses: int = 0
    in_progress: int = 0
    total_hours_learning: float = 0.0
