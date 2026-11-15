"""
app/middleware/rate_limit.py – slowapi rate limiter setup for SAHAAYA.
"""
from __future__ import annotations

from slowapi import Limiter
from slowapi.util import get_remote_address

# Global limiter — keyed on client IP address
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100/minute"],
    storage_uri="memory://",
)
