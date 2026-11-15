import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.middleware.rate_limit import limiter
from app.routers import auth, savings, marketplace, ai, youth, partners, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup log
    print(f"Starting SAHAAYA API [{settings.ENVIRONMENT}] - People's Savings Network")
    yield
    print("Shutting down SAHAAYA API...")

app = FastAPI(
    title="SAHAAYA API",
    description="API for SAHAAYA - People's Savings Network. Founder & CEO: Gunda Sai Jayanth.",
    version="1.0.0",
    lifespan=lifespan
)

# Rate limiter setup
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS – include allowed origins and any injected frontend URL
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()]
if getattr(settings, "web_url", None) and settings.web_url not in origins:
    origins.append(settings.web_url)
if not origins:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers: mount both under root and under /api for seamless public/internal routing
router_registry = [
    (auth.router, "/auth", ["Authentication"]),
    (savings.router, "/savings", ["Savings & Budgeting"]),
    (marketplace.router, "/marketplace", ["Affordable Marketplace"]),
    (ai.router, "/ai", ["Gemini AI Assistant"]),
    (youth.router, "/youth", ["Youth Development"]),
    (partners.router, "/partners", ["Business Partners"]),
    (admin.router, "/admin", ["Admin & Moderation"]),
]

for router_module, prefix, tags in router_registry:
    # Direct route (e.g. /ai/chat for internal service calls via binding)
    app.include_router(router_module, prefix=prefix, tags=tags)
    # Prefixed route (e.g. /api/ai/chat if routed via public /api rewrite)
    app.include_router(router_module, prefix=f"/api{prefix}", tags=tags)

@app.get("/health", tags=["Health"])
@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "app": "SAHAAYA Platform Backend",
        "tagline": "Save More. Live Better. Grow Together.",
        "founder": "Gunda Sai Jayanth",
        "environment": settings.ENVIRONMENT
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred. Please try again later.", "type": str(type(exc).__name__)}
    )
