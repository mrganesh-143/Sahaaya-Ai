"""
app/services/gemini.py – GeminiService for SAHAAYA AI assistant.

Uses google-generativeai with tenacity retry logic.
Supports streaming responses.
"""
from __future__ import annotations

import logging
from typing import AsyncGenerator, List, Optional

import google.generativeai as genai
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from app.config import get_settings
from app.models.ai import ChatMessage, SupportedLanguage

logger = logging.getLogger(__name__)

LANGUAGE_NAMES = {
    "en": "English",
    "te": "Telugu (తెలుగు)",
    "hi": "Hindi (हिंदी)",
}

SYSTEM_PROMPT_TEMPLATE = (
    "You are Sahaaya AI, a friendly savings and lifestyle advisor for Indian families. "
    "Speak warmly in {language_name}. "
    "Help with budgeting, savings tips, affordable product recommendations, "
    "career guidance for youth, and general financial wellness. "
    "Format responses clearly. Use ₹ for currency. "
    "For Telugu/Hindi responses, use the respective script. "
    "Be concise but thorough. Always encourage healthy saving habits. "
    "When mentioning government schemes, name them accurately."
)


class GeminiService:
    """Wrapper around Google Gemini 1.5 Pro for SAHAAYA AI chat."""

    _instance: Optional["GeminiService"] = None
    _model: Optional[genai.GenerativeModel] = None

    def __init__(self) -> None:
        self.settings = get_settings()
        self._model = None

    @classmethod
    def get_instance(cls) -> "GeminiService":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def load_model(self) -> genai.GenerativeModel:
        """
        Initialise and cache the Gemini 1.5 Pro model.
        Called once at startup.
        """
        if self._model is None:
            genai.configure(api_key=self.settings.gemini_api_key)
            self._model = genai.GenerativeModel(
                model_name="gemini-1.5-pro",
                generation_config=genai.GenerationConfig(
                    temperature=0.7,
                    top_p=0.9,
                    top_k=40,
                    max_output_tokens=2048,
                ),
                safety_settings=[
                    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                ],
            )
            logger.info("Gemini 1.5 Pro model loaded.")
        return self._model

    def _build_history(
        self,
        messages: List[ChatMessage],
        language: SupportedLanguage,
        user_context: Optional[dict] = None,
    ) -> tuple[list, str]:
        """
        Convert ChatMessage list into Gemini history + system prompt.
        Returns (history_list, last_user_message).
        """
        language_name = LANGUAGE_NAMES.get(language, "English")
        system_prompt = SYSTEM_PROMPT_TEMPLATE.format(language_name=language_name)

        if user_context:
            context_parts = []
            if user_context.get("full_name"):
                context_parts.append(f"User's name: {user_context['full_name']}")
            if user_context.get("state"):
                context_parts.append(f"State: {user_context['state']}")
            if context_parts:
                system_prompt += "\n\nUser context: " + ", ".join(context_parts)

        history = []
        last_user_message = ""

        for msg in messages:
            role = "user" if msg.role == "user" else "model"
            if role == "user":
                last_user_message = msg.content
            history.append({"role": role, "parts": [msg.content]})

        # Remove the last user message from history (it goes as the prompt)
        if history and history[-1]["role"] == "user":
            history = history[:-1]

        return history, last_user_message, system_prompt

    @retry(
        retry=retry_if_exception_type(Exception),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        stop=stop_after_attempt(3),
        reraise=True,
    )
    async def generate_chat_response(
        self,
        messages: List[ChatMessage],
        language: SupportedLanguage = "en",
        user_context: Optional[dict] = None,
    ) -> str:
        """
        Generate a full (non-streaming) chat response.
        Retries up to 3 times with exponential backoff.
        """
        model = self.load_model()
        history, last_message, system_prompt = self._build_history(
            messages, language, user_context
        )

        # Prepend system prompt as a user/model exchange
        full_history = [
            {"role": "user", "parts": [system_prompt]},
            {"role": "model", "parts": ["Understood! I am Sahaaya AI, ready to help Indian families save more and live better. How can I assist you today?"]},
        ] + history

        chat = model.start_chat(history=full_history)
        response = chat.send_message(last_message)
        return response.text

    async def generate_streaming_response(
        self,
        messages: List[ChatMessage],
        language: SupportedLanguage = "en",
        user_context: Optional[dict] = None,
    ) -> AsyncGenerator[str, None]:
        """
        Generate a streaming chat response as an async generator.
        Yields text chunks as they arrive from Gemini.
        """
        model = self.load_model()
        history, last_message, system_prompt = self._build_history(
            messages, language, user_context
        )

        full_history = [
            {"role": "user", "parts": [system_prompt]},
            {"role": "model", "parts": ["Understood! I am Sahaaya AI, ready to help Indian families. How can I assist you?"]},
        ] + history

        chat = model.start_chat(history=full_history)

        try:
            response = chat.send_message(last_message, stream=True)
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as exc:
            logger.error("Gemini streaming error: %s", exc)
            yield "\n[Error: Could not generate response. Please try again.]"


# Module-level singleton
gemini_service = GeminiService.get_instance()
