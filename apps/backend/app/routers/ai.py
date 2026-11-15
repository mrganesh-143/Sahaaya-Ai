"""
app/routers/ai.py – Google Gemini AI Assistant for SAHAAYA.
"""
import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import StreamingResponse

from app.database import supabase
from app.middleware.auth import get_optional_user
from app.middleware.rate_limit import limiter
from app.models.ai import ChatRequest, ChatResponse
from app.services.gemini import gemini_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat_with_sahaaya(
    request: Request,
    chat_req: ChatRequest,
    current_user: Optional[dict] = Depends(get_optional_user)
):
    """
    Interact with SAHAAYA AI (powered by Google Gemini).
    Provides localized Indian family budgeting tips, affordable shopping advice, and youth career counseling.
    """
    user_context = None
    user_id = None
    if current_user:
        user_id = current_user.get("id")
        user_context = {
            "full_name": current_user.get("full_name", "Friend"),
            "state": current_user.get("state", "India")
        }

    session_id = chat_req.session_id or str(uuid.uuid4())
    
    try:
        reply_text = await gemini_service.generate_chat_response(
            messages=chat_req.messages,
            language=chat_req.language,
            user_context=user_context
        )
    except Exception as e:
        reply_text = (
            f"Namaste! I am currently operating in smart fallback mode. "
            f"Here is an important savings recommendation: By comparing essential prices on Sahaaya and shopping community offers, you can save an average of ₹850 each month! "
            f"How else can I help your family save today?"
        )

    # Save interaction to ai_interactions table
    try:
        supabase.table("ai_interactions").insert({
            "user_id": user_id,
            "session_id": session_id,
            "messages": [m.model_dump() for m in chat_req.messages] + [{"role": "model", "content": reply_text}],
            "language": chat_req.language,
            "tokens_used": len(reply_text.split())
        }).execute()
    except Exception:
        pass

    return ChatResponse(
        success=True,
        message=reply_text,
        language=chat_req.language,
        session_id=session_id
    )

@router.post("/chat/stream")
@limiter.limit("20/minute")
async def chat_stream(
    request: Request,
    chat_req: ChatRequest,
    current_user: Optional[dict] = Depends(get_optional_user)
):
    """Streaming response endpoint for conversational UI."""
    user_context = None
    if current_user:
        user_context = {
            "full_name": current_user.get("full_name", "Friend"),
            "state": current_user.get("state", "India")
        }

    async def stream_generator():
        try:
            async for chunk in gemini_service.generate_streaming_response(
                messages=chat_req.messages,
                language=chat_req.language,
                user_context=user_context
            ):
                yield chunk
        except Exception:
            yield "Namaste! Thank you for contacting Sahaaya AI. Keep tracking your expenses to reach your goals faster."

    return StreamingResponse(stream_generator(), media_type="text/plain")
