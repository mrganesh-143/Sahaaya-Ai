-- ============================================================
-- SAHAAYA – People's Savings Network
-- Migration 002: Row Level Security Policies
-- ============================================================

-- ============================================================
-- Enable RLS on ALL tables
-- ============================================================
ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals    ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets           ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses          ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories        ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers           ENABLE ROW LEVEL SECURITY;
ALTER TABLE products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers            ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders            ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses           ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs              ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships      ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications     ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs        ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER: is_admin() function
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT role FROM profiles WHERE id = auth.uid()
  ) = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================================
-- profiles
-- ============================================================
-- Users SELECT their own profile
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (id = auth.uid());

-- Admins can SELECT all profiles
CREATE POLICY "profiles_admin_select_all"
  ON profiles FOR SELECT
  USING (is_admin());

-- Users can UPDATE their own profile
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Auto-create profile on sign-up (INSERT by authenticated users for their own row)
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- ============================================================
-- savings_goals
-- ============================================================
CREATE POLICY "savings_goals_select_own"
  ON savings_goals FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "savings_goals_insert_own"
  ON savings_goals FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "savings_goals_update_own"
  ON savings_goals FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "savings_goals_delete_own"
  ON savings_goals FOR DELETE
  USING (user_id = auth.uid());

-- ============================================================
-- budgets
-- ============================================================
CREATE POLICY "budgets_select_own"
  ON budgets FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "budgets_insert_own"
  ON budgets FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "budgets_update_own"
  ON budgets FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "budgets_delete_own"
  ON budgets FOR DELETE
  USING (user_id = auth.uid());

-- ============================================================
-- expenses
-- ============================================================
CREATE POLICY "expenses_select_own"
  ON expenses FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "expenses_insert_own"
  ON expenses FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "expenses_update_own"
  ON expenses FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "expenses_delete_own"
  ON expenses FOR DELETE
  USING (user_id = auth.uid());

-- ============================================================
-- categories
-- ============================================================
-- Anyone (including anonymous) can SELECT active categories
CREATE POLICY "categories_select_all"
  ON categories FOR SELECT
  USING (true);

-- Only admin can INSERT
CREATE POLICY "categories_admin_insert"
  ON categories FOR INSERT
  WITH CHECK (is_admin());

-- Only admin can UPDATE
CREATE POLICY "categories_admin_update"
  ON categories FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can DELETE
CREATE POLICY "categories_admin_delete"
  ON categories FOR DELETE
  USING (is_admin());

-- ============================================================
-- sellers
-- ============================================================
-- Seller can SELECT their own record
CREATE POLICY "sellers_select_own"
  ON sellers FOR SELECT
  USING (user_id = auth.uid());

-- Admin can SELECT all sellers
CREATE POLICY "sellers_admin_select_all"
  ON sellers FOR SELECT
  USING (is_admin());

-- Anyone can view verified sellers (for the marketplace)
CREATE POLICY "sellers_select_verified"
  ON sellers FOR SELECT
  USING (verification_status = 'verified');

-- Seller can INSERT their own listing
CREATE POLICY "sellers_insert_own"
  ON sellers FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Seller can UPDATE their own record (non-verification fields)
CREATE POLICY "sellers_update_own"
  ON sellers FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admin can UPDATE any seller (including verification_status)
CREATE POLICY "sellers_admin_update"
  ON sellers FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Seller can DELETE their own record
CREATE POLICY "sellers_delete_own"
  ON sellers FOR DELETE
  USING (user_id = auth.uid());

-- ============================================================
-- products
-- ============================================================
-- Anyone can SELECT active + moderated products
CREATE POLICY "products_select_active_moderated"
  ON products FOR SELECT
  USING (is_active = true AND is_moderated = true);

-- Seller can SELECT all their own products (including inactive/unmoderated)
CREATE POLICY "products_select_own"
  ON products FOR SELECT
  USING (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  );

-- Admin can SELECT all products
CREATE POLICY "products_admin_select_all"
  ON products FOR SELECT
  USING (is_admin());

-- Seller can INSERT products for their own seller profile
CREATE POLICY "products_insert_own"
  ON products FOR INSERT
  WITH CHECK (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  );

-- Seller can UPDATE their own products
CREATE POLICY "products_update_own"
  ON products FOR UPDATE
  USING (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  )
  WITH CHECK (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  );

-- Admin can UPDATE any product (e.g., toggling is_moderated)
CREATE POLICY "products_admin_update"
  ON products FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Seller can DELETE their own products
CREATE POLICY "products_delete_own"
  ON products FOR DELETE
  USING (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  );

-- ============================================================
-- offers
-- ============================================================
-- Anyone can SELECT active offers
CREATE POLICY "offers_select_active"
  ON offers FOR SELECT
  USING (is_active = true AND valid_until >= NOW());

-- Seller can SELECT all their own offers
CREATE POLICY "offers_select_own"
  ON offers FOR SELECT
  USING (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  );

-- Seller can INSERT offers for their own seller profile
CREATE POLICY "offers_insert_own"
  ON offers FOR INSERT
  WITH CHECK (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  );

-- Seller can UPDATE their own offers
CREATE POLICY "offers_update_own"
  ON offers FOR UPDATE
  USING (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  )
  WITH CHECK (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  );

-- Seller can DELETE their own offers
CREATE POLICY "offers_delete_own"
  ON offers FOR DELETE
  USING (
    seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
  );

-- ============================================================
-- orders
-- ============================================================
-- User sees their own orders
CREATE POLICY "orders_select_own"
  ON orders FOR SELECT
  USING (user_id = auth.uid());

-- Seller sees orders that contain their products
CREATE POLICY "orders_select_seller"
  ON orders FOR SELECT
  USING (
    id IN (
      SELECT oi.order_id
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      JOIN sellers s  ON s.id = p.seller_id
      WHERE s.user_id = auth.uid()
    )
  );

-- Admin can SELECT all orders
CREATE POLICY "orders_admin_select_all"
  ON orders FOR SELECT
  USING (is_admin());

-- User can INSERT their own orders
CREATE POLICY "orders_insert_own"
  ON orders FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- User can UPDATE their own orders (e.g., cancel)
CREATE POLICY "orders_update_own"
  ON orders FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admin can UPDATE any order (status changes, payment updates)
CREATE POLICY "orders_admin_update"
  ON orders FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- order_items  (follows order access)
-- ============================================================
-- User sees items from their own orders
CREATE POLICY "order_items_select_own"
  ON order_items FOR SELECT
  USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

-- Seller sees items from orders containing their products
CREATE POLICY "order_items_select_seller"
  ON order_items FOR SELECT
  USING (
    product_id IN (
      SELECT p.id FROM products p
      JOIN sellers s ON s.id = p.seller_id
      WHERE s.user_id = auth.uid()
    )
  );

-- Admin can SELECT all order_items
CREATE POLICY "order_items_admin_select_all"
  ON order_items FOR SELECT
  USING (is_admin());

-- System/service role inserts order_items
CREATE POLICY "order_items_insert_own"
  ON order_items FOR INSERT
  WITH CHECK (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

-- ============================================================
-- courses
-- ============================================================
-- Anyone can SELECT active courses
CREATE POLICY "courses_select_active"
  ON courses FOR SELECT
  USING (is_active = true);

-- Admin can SELECT all (including inactive)
CREATE POLICY "courses_admin_select_all"
  ON courses FOR SELECT
  USING (is_admin());

-- Admin can INSERT courses
CREATE POLICY "courses_admin_insert"
  ON courses FOR INSERT
  WITH CHECK (is_admin());

-- Admin can UPDATE courses
CREATE POLICY "courses_admin_update"
  ON courses FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admin can DELETE courses
CREATE POLICY "courses_admin_delete"
  ON courses FOR DELETE
  USING (is_admin());

-- ============================================================
-- enrollments
-- ============================================================
-- User sees their own enrollments
CREATE POLICY "enrollments_select_own"
  ON enrollments FOR SELECT
  USING (user_id = auth.uid());

-- User can INSERT their own enrollments
CREATE POLICY "enrollments_insert_own"
  ON enrollments FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- User can UPDATE their own enrollment (progress)
CREATE POLICY "enrollments_update_own"
  ON enrollments FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admin can SELECT all enrollments
CREATE POLICY "enrollments_admin_select_all"
  ON enrollments FOR SELECT
  USING (is_admin());

-- ============================================================
-- jobs
-- ============================================================
-- Anyone can SELECT active jobs
CREATE POLICY "jobs_select_active"
  ON jobs FOR SELECT
  USING (is_active = true);

-- Admin can SELECT all jobs
CREATE POLICY "jobs_admin_select_all"
  ON jobs FOR SELECT
  USING (is_admin());

-- Admin can INSERT jobs
CREATE POLICY "jobs_admin_insert"
  ON jobs FOR INSERT
  WITH CHECK (is_admin());

-- Admin can UPDATE jobs
CREATE POLICY "jobs_admin_update"
  ON jobs FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admin can DELETE jobs
CREATE POLICY "jobs_admin_delete"
  ON jobs FOR DELETE
  USING (is_admin());

-- ============================================================
-- scholarships
-- ============================================================
-- Anyone can SELECT active scholarships
CREATE POLICY "scholarships_select_active"
  ON scholarships FOR SELECT
  USING (is_active = true);

-- Admin can SELECT all scholarships
CREATE POLICY "scholarships_admin_select_all"
  ON scholarships FOR SELECT
  USING (is_admin());

-- Admin can INSERT scholarships
CREATE POLICY "scholarships_admin_insert"
  ON scholarships FOR INSERT
  WITH CHECK (is_admin());

-- Admin can UPDATE scholarships
CREATE POLICY "scholarships_admin_update"
  ON scholarships FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admin can DELETE scholarships
CREATE POLICY "scholarships_admin_delete"
  ON scholarships FOR DELETE
  USING (is_admin());

-- ============================================================
-- ai_interactions
-- ============================================================
-- User sees their own interactions
CREATE POLICY "ai_interactions_select_own"
  ON ai_interactions FOR SELECT
  USING (user_id = auth.uid());

-- Admin can SELECT all interactions
CREATE POLICY "ai_interactions_admin_select_all"
  ON ai_interactions FOR SELECT
  USING (is_admin());

-- User can INSERT their own interactions
CREATE POLICY "ai_interactions_insert_own"
  ON ai_interactions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- User can UPDATE their own interactions (e.g., append messages)
CREATE POLICY "ai_interactions_update_own"
  ON ai_interactions FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================
-- notifications
-- ============================================================
-- User sees their own notifications
CREATE POLICY "notifications_select_own"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

-- User can UPDATE their own notifications (mark as read)
CREATE POLICY "notifications_update_own"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Service role / admin can INSERT notifications for any user
CREATE POLICY "notifications_admin_insert"
  ON notifications FOR INSERT
  WITH CHECK (is_admin());

-- User can DELETE (dismiss) their own notifications
CREATE POLICY "notifications_delete_own"
  ON notifications FOR DELETE
  USING (user_id = auth.uid());

-- ============================================================
-- audit_logs  (admin only)
-- ============================================================
CREATE POLICY "audit_logs_admin_select"
  ON audit_logs FOR SELECT
  USING (is_admin());

CREATE POLICY "audit_logs_admin_insert"
  ON audit_logs FOR INSERT
  WITH CHECK (is_admin());
