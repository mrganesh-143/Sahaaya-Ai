export interface User {
  id: string;
  email: string;
  phone?: string;
  role: 'family' | 'youth' | 'business_partner' | 'admin';
  language_preference: 'en' | 'te' | 'hi';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  occupation?: string;
  monthly_income?: number;
  family_size?: number;
  notifications_email: boolean;
  notifications_sms: boolean;
  notifications_push: boolean;
  created_at: string;
  updated_at: string;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date?: string;
  category: 'emergency' | 'education' | 'home' | 'vehicle' | 'wedding' | 'travel' | 'retirement' | 'other';
  icon?: string;
  color?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  month: number;
  year: number;
  category: string;
  allocated_amount: number;
  spent_amount: number;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  budget_id?: string;
  amount: number;
  category: string;
  description: string;
  merchant?: string;
  date: string;
  payment_method?: 'cash' | 'upi' | 'card' | 'netbanking';
  receipt_url?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: 'groceries' | 'pulses' | 'oil' | 'spices' | 'personal_care' | 'household';
  brand?: string;
  image_url?: string;
  original_price: number;
  discounted_price: number;
  unit: string;
  quantity_available: number;
  seller_id?: string;
  seller_name?: string;
  rating?: number;
  review_count?: number;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  savings_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  delivery_address?: string;
  payment_method?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  thumbnail_url?: string;
  enrollment_count: number;
  rating?: number;
  is_free: boolean;
  price?: number;
  language: 'en' | 'te' | 'hi';
  certificate_available: boolean;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full_time' | 'part_time' | 'internship' | 'freelance';
  category: string;
  min_salary?: number;
  max_salary?: number;
  experience_required?: string;
  skills_required: string[];
  description: string;
  apply_url?: string;
  posted_at: string;
  deadline?: string;
  is_active: boolean;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  eligibility: string;
  category: string;
  apply_url?: string;
  deadline?: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: 'en' | 'te' | 'hi';
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'savings_tip' | 'goal_milestone' | 'deal_alert' | 'payment_due' | 'order_update' | 'system';
  title: string;
  message: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export type Language = 'en' | 'te' | 'hi';
export type UserRole = 'family' | 'youth' | 'business_partner' | 'admin';
