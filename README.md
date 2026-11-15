# SAHAAYA – People's Savings Network
### *Save More. Live Better. Grow Together.*

> **Founder & CEO:** Gunda Sai Jayanth  
> **Mission:** Make affordable essentials, financial savings opportunities, education, and employment accessible to every family across India.

---

## 🇮🇳 About SAHAAYA

**SAHAAYA** is an AI-powered social-impact technology ecosystem designed to:
1. **Support Low-Income Families:** Provide essential groceries and staples up to 35% below retail MRP by partnering directly with verified MSMEs and agricultural cooperatives.
2. **Help Middle-Class Households:** Build lasting wealth through disciplined budget tracking, goal setting, and emergency reserves.
3. **Empower Indian Youth:** Deliver 100% free certified skill courses (Tally, Web Dev, Spoken English), verified jobs, internships, and scholarship assistance.
4. **Foster Community Commerce:** Equip local retailers and producers with a zero-predatory-commission digital sales portal.

---

## 📐 Technology Architecture

```
sahaaya/
├── apps/
│   ├── web/          # Next.js 14, React 18, TypeScript, Tailwind CSS
│   ├── backend/      # Python 3.11, FastAPI, Pydantic v2, Uvicorn
│   └── mobile/       # React Native, Expo SDK 50 (Android & iOS)
├── packages/
│   └── shared/       # Shared Indian currency utilities, constants, types
├── supabase/
│   ├── migrations/   # 001 Schema, 002 RLS Security Policies, 003 Seed Data
│   └── README.md     # Supabase execution guide
└── docs/
    ├── ARCHITECTURE.md # System & Security Design
    ├── SETUP.md        # Local Development & Quickstart
    ├── API.md          # REST API Specification
    └── DEPLOYMENT.md   # Cloud Run, Vercel & Mobile Store Deployment
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18 or v20+
- **pnpm**: `npm install -g pnpm`
- **Python**: 3.11+
- **Supabase Account**: [supabase.com](https://supabase.com)
- **Google Gemini API Key**: [Google AI Studio](https://aistudio.google.com/)

---

### 1. Database Setup (Supabase)
1. Create a new Supabase project in the Mumbai (ap-south-1) region.
2. In the Supabase SQL Editor, run the migration scripts in order:
   - `supabase/migrations/001_initial_schema.sql` (18 tables, triggers, indexes)
   - `supabase/migrations/002_rls_policies.sql` (Row Level Security on all tables)
   - `supabase/migrations/003_seed_data.sql` (Seed staples, courses, scholarships)

### 2. Backend (FastAPI)
```bash
cd apps/backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # Fill in SUPABASE_URL, ANON_KEY, GEMINI_API_KEY
uvicorn app.main:app --reload --port 8000
```
Swagger UI will be live at: `http://localhost:8000/docs`

### 3. Responsive Web (Next.js 14)
```bash
cd apps/web
pnpm install
cp .env.example .env.local  # Fill in NEXT_PUBLIC_SUPABASE_URL and GEMINI_API_KEY
pnpm dev
```
Open `http://localhost:3000` in your browser.

### 4. Mobile App (Expo / React Native)
```bash
cd apps/mobile
pnpm install
npx expo start
```
Scan the QR code with **Expo Go** on Android or iOS.

---

## 🎨 Color Palette & Design System

| Element | Color | Hex Code | Purpose |
|---|---|---|---|
| **Primary** | Deep Forest Green | `#1B5E20` | Trust, stability, Indian agriculture & growth |
| **Accent** | Vibrant Lime | `#8BC34A` | Prosperity, modern energy, savings badges |
| **Background** | Clean Cream White | `#FAFAF7` | High readability, warm accessible feel |
| **Surface** | Pure White | `#FFFFFF` | Cards, modals, drawers |
| **Text** | Charcoal | `#1A1A1A` | Crisp typography |

---

## 🔒 Security & Compliance
- **Strict Row Level Security (RLS):** Every single user profile, goal, and expense is accessible only to its owner via `auth.uid()`.
- **Payment Architecture:** Designed for standard compliant Indian payment gateways (such as Razorpay). Real transactions enabled once KYC and banking compliance are approved.
- **Data Protection:** Personal identification numbers and passwords are never exposed; service-role keys are strictly server-side.

---

## 👥 Leadership
- **Founder & CEO:** Gunda Sai Jayanth
- **Headquarters:** Hyderabad, Telangana, India
- **License:** Proprietary & Social-Impact Commercial License
