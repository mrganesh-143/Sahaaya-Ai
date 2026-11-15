# SAHAAYA – Architecture & System Design Document

**Founder & CEO:** Gunda Sai Jayanth  
**Tagline:** Save More. Live Better. Grow Together.

---

## 1. High-Level System Architecture

```
                       +-----------------------------------+
                       |          END USERS                |
                       | (Families, Youth, Partners, Admin)|
                       +-----------------+-----------------+
                                         |
         +-------------------------------+-------------------------------+
         |                                                               |
         v                                                               v
+-----------------------+                                     +-----------------------+
|   Next.js 14 Web App  |                                     | React Native / Expo   |
| (Responsive, Desktop, |                                     | (Android & iOS Native |
|  Tablet, Mobile Web)  |                                     |  Mobile Applications) |
+-----------+-----------+                                     +-----------+-----------+
            |                                                             |
            |            +-----------------------------------+            |
            +----------->|        FastAPI REST Engine        |<-----------+
            |            |  - Rate Limiting (SlowAPI)        |
            |            |  - JWT Authentication Middleware  |
            |            |  - Business Logic & Aggregators   |
            |            +-----------------+-----------------+
            |                              |
            v                              v
+-----------------------+      +-----------------------+      +-----------------------+
|  Supabase Auth & RLS  |      |   PostgreSQL Engine   |      | Google Gemini 1.5 Pro |
| - Email & Password    |      | - 18 Tables           |      | - Budget Audit Engine |
| - Role RBAC Policies  |      | - GIN Search Indexes  |      | - Multilingual Chat   |
| - Secure JWT Claims   |      | - Audit Logs & Triggers|     | - (EN, TE, HI)        |
+-----------------------+      +-----------------------+      +-----------------------+
```

---

## 2. Core Pillars & Capabilities

### A. Family Savings Engine
- Tracks household budget across Indian expense buckets: Groceries, Dairy, School Fees, Healthcare, Transport, Utilities.
- Automates savings goals with compound progress tracking.
- Provides immediate calculation of monthly money saved through Sahaaya wholesale sourcing.

### B. Affordable Marketplace (B2C & Community Bulk)
- Direct link between MSMEs / agricultural cooperatives and households.
- Eliminates retail distributor markups of 25-40%.
- Compliant payment flow architecture (Razorpay integration ready).

### C. Sahaaya AI Assistant (Google Gemini 1.5 Pro)
- Prompt engineered with cultural financial wisdom (frugal shopping habits, Indian staples comparison).
- Multilingual conversational capabilities: **English, Telugu (తెలుగు), and Hindi (हिंदी)**.
- Rate-limited and sanitized to protect user privacy.

### D. Youth Skilling & Employment Hub
- Free vocational tracks: Tally Prime with GST, Full-Stack Web Development, Spoken English, and Digital Marketing.
- Direct application pipeline to entry-level jobs and internships in Hyderabad and across India.
- Curated government and NGO scholarship discovery.

---

## 3. Data & Security Architecture

### Row Level Security (RLS) Matrix
| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `profiles` | Own profile (Admin: all) | Own profile | Own profile | Admin only |
| `savings_goals` | Own goals | Own goals | Own goals | Own goals |
| `budgets` | Own budgets | Own budgets | Own budgets | Own budgets |
| `expenses` | Own expenses | Own expenses | Own expenses | Own expenses |
| `products` | Public (active & moderated) | Verified Seller | Verified Seller | Seller / Admin |
| `orders` | Own orders (Seller: item-owned) | Authenticated | Own / Admin | Admin only |
| `audit_logs` | Admin only | System trigger | Immutable | Disabled |

---

## 4. Payment Integration Architecture (Compliant Flow)

```
[User App] --------> 1. Request Order Draft --------> [FastAPI Backend]
                                                               |
                                                  2. Validate Cart & Stock
                                                               |
                                                  3. Create Order (Status: Pending)
                                                               |
[User App] <------- 4. Order ID & Amount (Paise) <----+
    |
    v (Upon production KYC & compliance completion)
5. Initialize Razorpay Checkout
6. Capture Payment Webhook Signature
7. Mark Order 'Confirmed' & Dispatch to Co-Op
```
*Note: In prototype mode, orders are marked as confirmed without storing or processing card numbers, adhering strictly to Indian financial regulations.*
