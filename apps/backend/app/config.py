"""
app/config.py – Pydantic Settings model for SAHAAYA backend.
"""
from __future__ import annotations

from functools import lru_cache
from typing import List

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # --- Supabase ---
    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str

    # --- Google Gemini ---
    gemini_api_key: str

    # --- JWT ---
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60 * 24  # 24 hours

    # --- CORS ---
    # Comma-separated list of origins. In production Vercel sets WEB_URL via
    # the web service's public URL; locally falls back to localhost:3000.
    allowed_origins: str = "http://localhost:3000"
    web_url: str = ""  # Injected by Vercel when web service calls backend

    # --- App ---
    environment: str = "development"
    app_name: str = "SAHAAYA API"
    app_version: str = "1.0.0"
    debug: bool = False

    # --- Rate Limiting ---
    rate_limit_general: str = "100/minute"
    rate_limit_ai_chat: str = "10/minute"

    @field_validator("environment")
    @classmethod
    def validate_environment(cls, v: str) -> str:
        allowed = {"development", "staging", "production"}
        if v not in allowed:
            raise ValueError(f"environment must be one of {allowed}")
        return v

    def get_allowed_origins_list(self) -> List[str]:
        """Return allowed origins as a list."""
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        return self.environment == "production"

    @property
    def is_development(self) -> bool:
        return self.environment == "development"


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance – call this everywhere."""
    return Settings()
