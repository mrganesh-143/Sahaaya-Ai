"""
apps/backend/main.py – Root entrypoint for Vercel and ASGI runners.
Re-exports the FastAPI app instance from app.main.
"""
from app.main import app

__all__ = ["app"]
