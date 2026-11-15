# SAHAAYA – REST API Reference

Base URL: `https://api.sahaaya.network` (Local: `http://localhost:8000`)

---

## 1. Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register new user & create profile | No |
| `POST` | `/auth/login` | Authenticate with email/password | No |
| `POST` | `/auth/logout` | Revoke session | Yes |
| `POST` | `/auth/forgot-password`| Send recovery email | No |
| `GET` | `/auth/me` | Fetch authenticated profile | Yes |
| `PUT` | `/auth/me` | Update personal details & language | Yes |

---

## 2. Family Savings & Budgeting (`/savings`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/savings/goals` | List all user savings goals | Yes |
| `POST` | `/savings/goals` | Create a new target savings goal | Yes |
| `PUT` | `/savings/goals/{id}` | Update progress amount or deadline | Yes |
| `DELETE` | `/savings/goals/{id}` | Remove savings goal | Yes |
| `GET` | `/savings/budget` | Get active monthly budget | Yes |
| `POST` | `/savings/budget` | Set or update monthly budget | Yes |
| `GET` | `/savings/expenses` | List expense records (filterable by category/month) | Yes |
| `POST` | `/savings/expenses` | Log a new family expense | Yes |
| `GET` | `/savings/summary` | Aggregate dashboard stats & savings tips | Yes |

---

## 3. Affordable Marketplace (`/marketplace`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/marketplace/products` | Search & filter affordable staples | No |
| `GET` | `/marketplace/products/{id}` | Complete product detail & seller KYC | No |
| `GET` | `/marketplace/categories` | List active grocery categories | No |
| `GET` | `/marketplace/offers` | Active promotional community offers | No |
| `POST` | `/marketplace/orders` | Initiate community order & draft payment | Yes |
| `GET` | `/marketplace/orders/my` | View previous family grocery orders | Yes |

---

## 4. SAHAAYA AI Assistant (`/ai`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/ai/chat` | Chat with Gemini 1.5 Pro financial advisor | Optional |
| `POST` | `/ai/chat/stream` | Stream tokens for interactive typing effect | Optional |

Request Body:
```json
{
  "messages": [
    { "role": "user", "content": "How can our family save ₹1,500 on groceries this month?" }
  ],
  "language": "te"
}
```

---

## 5. Youth Development Portal (`/youth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/youth/courses` | List free certified skill courses | No |
| `GET` | `/youth/courses/{id}` | Course syllabus and instructor outline | No |
| `POST` | `/youth/courses/{id}/enroll` | Enroll student into free course | Yes |
| `GET` | `/youth/my-learning` | View enrolled courses & progress | Yes |
| `GET` | `/youth/jobs` | Browse verified jobs & internships | No |
| `GET` | `/youth/scholarships`| Browse government & NGO scholarship grants | No |

---

## 6. Business Partner Portal (`/partners`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/partners/register` | Apply as local MSME / agricultural seller | Yes |
| `GET` | `/partners/dashboard` | View seller analytics & orders | Yes (Partner) |
| `POST` | `/partners/products` | Create new wholesale essential listing | Yes (Partner) |
| `DELETE` | `/partners/products/{id}`| Remove listing | Yes (Partner) |

---

## 7. Platform Administration (`/admin`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/admin/analytics` | High-level ecosystem social-impact numbers | Yes (Admin) |
| `GET` | `/admin/users` | Search & audit user base | Yes (Admin) |
| `PUT` | `/admin/sellers/{id}/verify` | Approve or reject seller KYC | Yes (Admin) |
| `GET` | `/admin/products/pending` | Products awaiting price safety audit | Yes (Admin) |
| `PUT` | `/admin/products/{id}/moderate`| Approve or reject product listing | Yes (Admin) |
