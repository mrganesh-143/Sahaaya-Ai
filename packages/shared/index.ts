// ============================================================
// @sahaaya/shared — Shared Types, Constants & Utilities
// Used by apps/web (Next.js) and apps/mobile (Expo)
// ============================================================

// ---- User Roles -------------------------------------------------------

export const USER_ROLES = {
  FAMILY: "family",
  YOUTH: "youth",
  PARTNER: "partner",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// ---- Savings Categories -----------------------------------------------

export const SAVINGS_CATEGORIES = [
  { id: "groceries", label: "Groceries", emoji: "🛒", color: "#4CAF50" },
  { id: "pulses", label: "Pulses & Dal", emoji: "🫘", color: "#8BC34A" },
  { id: "oil", label: "Oil & Ghee", emoji: "🫙", color: "#FFC107" },
  { id: "spices", label: "Spices & Masala", emoji: "🌶️", color: "#F44336" },
  { id: "personal_care", label: "Personal Care", emoji: "🧴", color: "#9C27B0" },
  { id: "household", label: "Household", emoji: "🏠", color: "#2196F3" },
  { id: "education", label: "Education", emoji: "📚", color: "#00BCD4" },
  { id: "health", label: "Health & Medicine", emoji: "💊", color: "#E91E63" },
  { id: "clothing", label: "Clothing", emoji: "👗", color: "#FF9800" },
  { id: "transport", label: "Transport", emoji: "🚌", color: "#607D8B" },
  { id: "festivals", label: "Festivals & Events", emoji: "🎉", color: "#FF5722" },
  { id: "emergency", label: "Emergency Fund", emoji: "🆘", color: "#795548" },
] as const;

export type SavingsCategory = (typeof SAVINGS_CATEGORIES)[number];
export type SavingsCategoryId = SavingsCategory["id"];

// ---- SAHAAYA Product / Marketplace Categories -------------------------

export const SAHAAYA_CATEGORIES = [
  "Groceries",
  "Pulses & Dal",
  "Oil & Ghee",
  "Spices & Masala",
  "Personal Care",
  "Household Essentials",
  "Baby & Infant",
  "Health & Wellness",
  "Clothing & Textiles",
  "Electronics",
  "Kitchen & Cooking",
  "Stationery & Education",
  "Farming Supplies",
  "Local Handicrafts",
  "Dairy & Eggs",
  "Snacks & Beverages",
] as const;

export type SahaayaCategory = (typeof SAHAAYA_CATEGORIES)[number];

// ---- Indian States & UTs ----------------------------------------------

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
] as const;

export type IndianState = (typeof INDIAN_STATES)[number];

// ---- Language Support -------------------------------------------------

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

// ---- Shared TypeScript Interfaces -------------------------------------

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  language_preference: LanguageCode;
  state?: IndianState;
  city?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile extends User {
  family_size?: number;
  monthly_income?: number;
  savings_goal_amount?: number;
  bio?: string;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  category: SavingsCategoryId;
  deadline?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  month: number; // 1-12
  year: number;
  category: SavingsCategoryId;
  allocated_amount: number;
  spent_amount: number;
  created_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  budget_id?: string;
  category: SavingsCategoryId;
  amount: number;
  description: string;
  date: string;
  receipt_url?: string;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  category: SahaayaCategory;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  unit: string;
  stock_quantity: number;
  image_urls: string[];
  is_active: boolean;
  is_approved: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "refunded";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  delivery_address: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration_hours: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  thumbnail_url?: string;
  enrollment_count: number;
  rating: number;
  is_free: boolean;
  price?: number;
  created_at: string;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  company: string;
  location: string;
  state: IndianState;
  job_type: "full_time" | "part_time" | "internship" | "freelance";
  salary_min?: number;
  salary_max?: number;
  description: string;
  requirements: string[];
  skills: string[];
  deadline: string;
  is_active: boolean;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  language: LanguageCode;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: "savings" | "marketplace" | "youth" | "system" | "ai";
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

export interface SellerProfile {
  id: string;
  user_id: string;
  business_name: string;
  gst_number?: string;
  business_type: string;
  description: string;
  logo_url?: string;
  state: IndianState;
  city: string;
  address: string;
  verification_status: "pending" | "approved" | "rejected";
  rating: number;
  total_reviews: number;
  created_at: string;
}

export interface AuditLog {
  id: string;
  admin_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

// ---- Formatting Utilities ---------------------------------------------

/**
 * Formats a number as Indian currency (₹) with Indian number system.
 * e.g. 123456 → "₹1,23,456"
 * e.g. 10000000 → "₹1,00,00,000"
 */
export function formatIndianCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return "₹0";

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const [integerPart, decimalPart] = absAmount.toFixed(2).split(".");

  const formatted = formatIndianInteger(integerPart);
  const result = decimalPart === "00"
    ? `₹${formatted}`
    : `₹${formatted}.${decimalPart}`;

  return isNegative ? `-${result}` : result;
}

/**
 * Formats a number using Indian number system (lakhs/crores).
 * e.g. 1234567 → "12,34,567"
 */
export function formatIndianNumber(n: number): string {
  if (isNaN(n)) return "0";
  const isNegative = n < 0;
  const formatted = formatIndianInteger(String(Math.abs(Math.round(n))));
  return isNegative ? `-${formatted}` : formatted;
}

function formatIndianInteger(numStr: string): string {
  if (numStr.length <= 3) return numStr;

  // Last 3 digits
  const last3 = numStr.slice(-3);
  const remaining = numStr.slice(0, -3);

  if (remaining.length === 0) return last3;

  // Remaining digits grouped by 2
  const groups: string[] = [];
  let rem = remaining;
  while (rem.length > 0) {
    groups.unshift(rem.slice(-2));
    rem = rem.slice(0, -2);
    if (rem.length === 1) {
      groups.unshift(rem);
      break;
    }
  }

  return [...groups, last3].join(",");
}

/**
 * Formats a number into human-readable Indian units.
 * e.g. 1500000 → "15 Lakh"
 * e.g. 25000000 → "2.5 Crore"
 */
export function formatIndianShort(n: number): string {
  if (n >= 1_00_00_000) {
    return `${(n / 1_00_00_000).toFixed(1).replace(/\.0$/, "")} Crore`;
  } else if (n >= 1_00_000) {
    return `${(n / 1_00_000).toFixed(1).replace(/\.0$/, "")} Lakh`;
  } else if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")} K`;
  }
  return String(n);
}

/**
 * Calculates savings percentage.
 */
export function calculateSavingsPercent(original: number, discounted: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - discounted) / original) * 100);
}

/**
 * Returns initials from a full name.
 * e.g. "Gunda Sai Jayanth" → "GS"
 */
export function getInitials(name: string): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Validates Indian phone number (10 digits, starts with 6-9).
 */
export function isValidIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""));
}

/**
 * Formats Indian phone with country code.
 */
export function formatIndianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  return phone;
}

// ---- Constants --------------------------------------------------------

export const APP_NAME = "SAHAAYA";
export const APP_TAGLINE = "Save More. Live Better. Grow Together.";
export const APP_DESCRIPTION =
  "India's People's Savings Network — connecting families, youth, and local businesses for collective prosperity.";
export const FOUNDER = "Gunda Sai Jayanth";
export const MADE_IN_INDIA = "Made with ❤️ in India 🇮🇳 for India";

export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const RAZORPAY_CURRENCY = "INR";
export const MIN_ORDER_AMOUNT = 50; // ₹50
export const MAX_ORDER_AMOUNT = 500000; // ₹5 Lakh
