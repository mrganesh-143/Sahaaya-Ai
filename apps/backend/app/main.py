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

# CORS – include the Vercel web-service URL when injected via binding
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()]
if settings.WEB_URL and settings.WEB_URL not in origins:
    origins.append(settings.WEB_URL)
if not origins:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(savings.router, prefix="/savings", tags=["Savings & Budgeting"])
app.include_router(marketplace.router, prefix="/marketplace", tags=["Affordable Marketplace"])
app.include_router(ai.router, prefix="/ai", tags=["Gemini AI Assistant"])
app.include_router(youth.router, prefix="/youth", tags=["Youth Development"])
app.include_router(partners.router, prefix="/partners", tags=["Business Partners"])
app.include_router(admin.router, prefix="/admin", tags=["Admin & Moderation"])

@app.get("/health", tags=["Health"])
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
