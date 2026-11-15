-- ============================================================
-- SAHAAYA – People's Savings Network
-- Migration 001: Initial Schema
-- ============================================================

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- HELPER: updated_at trigger function
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TABLE: profiles
-- ============================================================
CREATE TABLE profiles (
  id                  uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name           text,
  phone               text,
  avatar_url          text,
  role                text        NOT NULL DEFAULT 'family'
                                  CHECK (role IN ('family', 'youth', 'partner', 'admin')),
  language_preference text        NOT NULL DEFAULT 'en',
  city                text,
  state               text,
  created_at          timestamptz NOT NULL DEFAULT NOW(),
  updated_at          timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- TABLE: savings_goals
-- ============================================================
CREATE TABLE savings_goals (
  id             uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid          NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title          text          NOT NULL,
  target_amount  numeric(12,2) NOT NULL,
  current_amount numeric(12,2) NOT NULL DEFAULT 0,
  deadline       date,
  category       text,
  status         text          NOT NULL DEFAULT 'active'
                               CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  created_at     timestamptz   NOT NULL DEFAULT NOW(),
  updated_at     timestamptz   NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_savings_goals_updated_at
  BEFORE UPDATE ON savings_goals
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_savings_goals_user_id ON savings_goals(user_id);

-- ============================================================
-- TABLE: budgets
-- ============================================================
CREATE TABLE budgets (
  id           uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid          NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  month        integer       NOT NULL CHECK (month BETWEEN 1 AND 12),
  year         integer       NOT NULL CHECK (year >= 2000),
  total_budget numeric(12,2) NOT NULL,
  created_at   timestamptz   NOT NULL DEFAULT NOW(),
  updated_at   timestamptz   NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, month, year)
);

CREATE TRIGGER trg_budgets_updated_at
  BEFORE UPDATE ON budgets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- TABLE: expenses
-- ============================================================
CREATE TABLE expenses (
  id           uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid          NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  budget_id    uuid          REFERENCES budgets(id) ON DELETE SET NULL,
  amount       numeric(12,2) NOT NULL CHECK (amount > 0),
  category     text          NOT NULL,
  description  text,
  expense_date date          NOT NULL DEFAULT CURRENT_DATE,
  receipt_url  text,
  created_at   timestamptz   NOT NULL DEFAULT NOW(),
  updated_at   timestamptz   NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_expenses_user_date ON expenses(user_id, expense_date);

-- ============================================================
-- TABLE: categories
-- ============================================================
CREATE TABLE categories (
  id         uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text    NOT NULL UNIQUE,
  slug       text    NOT NULL UNIQUE,
  icon       text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true
);

-- ============================================================
-- TABLE: sellers
-- ============================================================
CREATE TABLE sellers (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid          NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_name       text          NOT NULL,
  gst_number          text,
  address             text,
  city                text,
  state               text,
  verification_status text          NOT NULL DEFAULT 'pending'
                                    CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  rating              numeric(3,2)  NOT NULL DEFAULT 0,
  total_reviews       integer       NOT NULL DEFAULT 0,
  created_at          timestamptz   NOT NULL DEFAULT NOW(),
  updated_at          timestamptz   NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_sellers_updated_at
  BEFORE UPDATE ON sellers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE products (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id           uuid          NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  category_id         uuid          REFERENCES categories(id) ON DELETE SET NULL,
  name                text          NOT NULL,
  description         text,
  original_price      numeric(12,2),
  discounted_price    numeric(12,2),
  discount_percentage numeric(5,2),
  unit                text,
  stock_quantity      integer       NOT NULL DEFAULT 0,
  images              text[],
  is_active           boolean       NOT NULL DEFAULT true,
  is_moderated        boolean       NOT NULL DEFAULT false,
  search_vector       tsvector,
  created_at          timestamptz   NOT NULL DEFAULT NOW(),
  updated_at          timestamptz   NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- GIN index for full-text search
CREATE INDEX idx_products_search_vector ON products USING GIN (search_vector);

-- Additional indexes
CREATE INDEX idx_products_seller_id    ON products(seller_id);
CREATE INDEX idx_products_category_id  ON products(category_id);
CREATE INDEX idx_products_is_active    ON products(is_active, is_moderated);

-- Full-text search trigger
CREATE OR REPLACE FUNCTION products_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_search_vector
  BEFORE INSERT OR UPDATE OF name, description ON products
  FOR EACH ROW EXECUTE FUNCTION products_search_vector_update();

-- ============================================================
-- TABLE: offers
-- ============================================================
CREATE TABLE offers (
  id             uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id      uuid          NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  product_id     uuid          NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title          text,
  discount_type  text          NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
  discount_value numeric(10,2) NOT NULL CHECK (discount_value > 0),
  valid_from     timestamptz   NOT NULL DEFAULT NOW(),
  valid_until    timestamptz   NOT NULL,
  is_active      boolean       NOT NULL DEFAULT true,
  created_at     timestamptz   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_offers_seller_id  ON offers(seller_id);
CREATE INDEX idx_offers_product_id ON offers(product_id);
CREATE INDEX idx_offers_valid      ON offers(is_active, valid_until);

-- ============================================================
-- TABLE: orders
-- ============================================================
CREATE TABLE orders (
  id                 uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid          NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  status             text          NOT NULL DEFAULT 'pending'
                                   CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  total_amount       numeric(12,2) NOT NULL,
  payment_status     text          NOT NULL DEFAULT 'pending'
                                   CHECK (payment_status IN ('pending','paid','failed','refunded')),
  payment_provider   text,
  payment_reference  text,
  delivery_address   jsonb,
  created_at         timestamptz   NOT NULL DEFAULT NOW(),
  updated_at         timestamptz   NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_orders_user_id ON orders(user_id);

-- ============================================================
-- TABLE: order_items
-- ============================================================
CREATE TABLE order_items (
  id               uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id         uuid          NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id       uuid          NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity         integer       NOT NULL CHECK (quantity > 0),
  unit_price       numeric(12,2) NOT NULL,
  discount_applied numeric(12,2) NOT NULL DEFAULT 0
);

CREATE INDEX idx_order_items_order_id   ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ============================================================
-- TABLE: courses
-- ============================================================
CREATE TABLE courses (
  id            uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text         NOT NULL,
  description   text,
  instructor    text,
  duration_hours integer,
  is_free       boolean      NOT NULL DEFAULT true,
  price         numeric(10,2) NOT NULL DEFAULT 0,
  category      text,
  level         text         NOT NULL DEFAULT 'beginner'
                             CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  thumbnail_url text,
  is_active     boolean      NOT NULL DEFAULT true,
  created_at    timestamptz  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_courses_is_active ON courses(is_active);

-- ============================================================
-- TABLE: enrollments
-- ============================================================
CREATE TABLE enrollments (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id           uuid        NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress_percentage integer     NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
  completed_at        timestamptz,
  created_at          timestamptz NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);

-- ============================================================
-- TABLE: jobs
-- ============================================================
CREATE TABLE jobs (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  company      text        NOT NULL,
  title        text        NOT NULL,
  type         text        NOT NULL CHECK (type IN ('job', 'internship')),
  location     text,
  is_remote    boolean     NOT NULL DEFAULT false,
  stipend_min  integer,
  stipend_max  integer,
  description  text,
  requirements text,
  deadline     date,
  is_active    boolean     NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_jobs_is_active ON jobs(is_active, type);

-- ============================================================
-- TABLE: scholarships
-- ============================================================
CREATE TABLE scholarships (
  id          uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text          NOT NULL,
  provider    text,
  amount      numeric(12,2),
  deadline    date,
  eligibility text,
  description text,
  apply_url   text,
  is_active   boolean       NOT NULL DEFAULT true,
  created_at  timestamptz   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_scholarships_is_active ON scholarships(is_active);

-- ============================================================
-- TABLE: ai_interactions
-- ============================================================
CREATE TABLE ai_interactions (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_id  text        NOT NULL,
  messages    jsonb       NOT NULL DEFAULT '[]'::jsonb,
  language    text        NOT NULL DEFAULT 'en',
  tokens_used integer     NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_interactions_user_id    ON ai_interactions(user_id);
CREATE INDEX idx_ai_interactions_session_id ON ai_interactions(session_id);

-- ============================================================
-- TABLE: notifications
-- ============================================================
CREATE TABLE notifications (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title      text        NOT NULL,
  message    text        NOT NULL,
  type       text        NOT NULL CHECK (type IN ('savings','marketplace','youth','system')),
  is_read    boolean     NOT NULL DEFAULT false,
  action_url text,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- ============================================================
-- TABLE: audit_logs
-- ============================================================
CREATE TABLE audit_logs (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id    uuid        NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  action      text        NOT NULL,
  entity_type text        NOT NULL,
  entity_id   uuid,
  old_data    jsonb,
  new_data    jsonb,
  ip_address  text,
  created_at  timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_admin_id   ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_entity     ON audit_logs(entity_type, entity_id);
