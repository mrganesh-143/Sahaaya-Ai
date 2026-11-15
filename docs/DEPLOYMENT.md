# SAHAAYA – Cloud & App Stores Deployment Guide

Comprehensive instructions for deploying SAHAAYA to Google Cloud, Vercel, Google Play Store, and Apple App Store.

---

## 1. Backend Deployment: Google Cloud Run

FastAPI is containerized using `apps/backend/Dockerfile`.

### Build & Deploy Commands
```bash
# Set GCP Project
gcloud config set project sahaaya-social-impact

# Build Docker image in Google Artifact Registry
gcloud builds submit --tag gcr.io/sahaaya-social-impact/sahaaya-api:latest apps/backend

# Deploy to Cloud Run (Mumbai region)
gcloud run deploy sahaaya-api \
  --image gcr.io/sahaaya-social-impact/sahaaya-api:latest \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars "SUPABASE_URL=https://your-proj.supabase.co,ENVIRONMENT=production" \
  --set-secrets "SUPABASE_ANON_KEY=supabase-anon:latest,SUPABASE_SERVICE_ROLE_KEY=supabase-service:latest,GEMINI_API_KEY=gemini-key:latest"
```

---

## 2. Frontend Deployment: Vercel (Next.js 14)

```bash
cd apps/web
vercel --prod
```

Configure Environment Variables in Vercel Dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_API_URL`

---

## 3. Mobile Apps Deployment: Expo EAS Build

### Android (Google Play Store - AAB format)
```bash
cd apps/mobile

# Log in to Expo Application Services
eas login

# Configure project
eas build:configure

# Generate Android App Bundle for Google Play Store
eas build --platform android --profile production
```
Download the resulting `.aab` file and upload to **Google Play Console** under the package `com.sahaaya.app`.

### iOS (Apple App Store - IPA format)
```bash
# Build for iOS
eas build --platform ios --profile production

# Submit directly to TestFlight & App Store
eas submit -p ios
```

---

## 4. Production Security Checklist

- [x] All Supabase tables protected by strict Row Level Security (RLS).
- [x] No `service_role` keys exposed to web or mobile clients.
- [x] API rate limiting enabled via SlowAPI (100 req/min general, 20 req/min for AI).
- [x] Payment credentials never saved on server (tokenized compliant flow).
- [x] Data transit protected via TLS 1.3 / HTTPS.
