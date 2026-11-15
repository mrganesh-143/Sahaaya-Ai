"""
app/models/ai.py – Pydantic v2 AI chat schemas for SAHAAYA.
"""
from __future__ import annotations

from datetime import datetime
from typing import List, Literal, Optional
from uuid import UUID

from pydantic import BaseModel, Field, model_config

MessageRole = Literal["user", "model", "system"]
SupportedLanguage = Literal["en", "te", "hi"]


class ChatMessage(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    role: MessageRole
    content: str = Field(..., min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    model_config = model_config(str_strip_whitespace=True)

    messages: List[ChatMessage] = Field(..., min_length=1, max_length=50)
    language: SupportedLanguage = "en"
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    success: bool = True
    message: str
    language: SupportedLanguage
    session_id: Optional[str] = None
    tokens_used: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ChatLogEntry(BaseModel):
    model_config = model_config(from_attributes=True)

    id: UUID
    user_id: Optional[UUID] = None
    session_id: str
    language: str
    messages: List[ChatMessage]
    response_preview: str
    tokens_used: Optional[int] = None
    created_at: datetime
