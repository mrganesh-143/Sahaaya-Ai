# SAHAAYA – Complete Local Setup Guide

Follow these steps to run the complete SAHAAYA platform on your local machine.

---

## 1. Prerequisites Installation

- **Node.js**: v18.17.0 or v20+ (`node -v`)
- **Python**: 3.11+ (`python --version`)
- **pnpm**: `npm install -g pnpm`
- **Expo CLI**: `npm install -g expo-cli`
- **Git**

---

## 2. Supabase Cloud Configuration

1. Visit [supabase.com](https://supabase.com) and create an organization & project named `sahaaya-production`.
2. Select region: **Mumbai (ap-south-1)** for lowest latency in India.
3. Open the **SQL Editor** tab in your dashboard.
4. Execute the migration scripts in sequence:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_seed_data.sql`
5. Go to **Project Settings -> API** and copy:
   - `Project URL`
   - `anon / public key`
   - `service_role key` (keep private!)

---

## 3. Google Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Create an API key.
3. Save it as `GEMINI_API_KEY`.

---

## 4. Backend (FastAPI) Setup

```bash
cd apps/backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat <<EOT > .env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8081
ENVIRONMENT=development
EOT

# Run FastAPI server
uvicorn app.main:app --reload --port 8000
```
API Documentation will be live at `http://localhost:8000/docs`.

---

## 5. Web App (Next.js 14) Setup

```bash
cd apps/web

# Install packages
pnpm install

# Create .env.local
cat <<EOT > .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-key
NEXT_PUBLIC_API_URL=http://localhost:8000
EOT

# Run dev server
pnpm dev
```
Open `http://localhost:3000`.

---

## 6. Mobile App (React Native & Expo) Setup

```bash
cd apps/mobile

# Install packages
pnpm install

# Create .env
cat <<EOT > .env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_URL=http://localhost:8000
EOT

# Start Expo server
npx expo start
```
- Press `a` for Android Emulator.
- Press `i` for iOS Simulator.
- Scan QR code using the **Expo Go** app on your physical mobile phone.
