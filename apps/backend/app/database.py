"""
app/database.py – Supabase client initialization for SAHAAYA backend.
Uses the service-role key for privileged backend operations.
"""
from __future__ import annotations

import logging
from functools import lru_cache

from supabase import Client, create_client

from app.config import get_settings

logger = logging.getLogger(__name__)


@lru_cache()
def get_supabase_client() -> Client:
    """
    Returns a Supabase client initialised with the SERVICE ROLE key.
    This client bypasses Row Level Security – use only for trusted
    server-side operations, never expose it to the client.
    """
    settings = get_settings()
    client: Client = create_client(
        settings.supabase_url,
        settings.supabase_service_role_key,
    )
    logger.info("Supabase service-role client initialised.")
    return client


def get_supabase_anon_client() -> Client:
    """
    Returns a Supabase client initialised with the ANON key.
    Suitable for auth operations that respect RLS.
    """
    settings = get_settings()
    client: Client = create_client(
        settings.supabase_url,
        settings.supabase_anon_key,
    )
    return client


# Singleton instances
supabase: Client = get_supabase_client()
supabase_anon: Client = get_supabase_anon_client()
