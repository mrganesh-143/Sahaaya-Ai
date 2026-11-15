-- ============================================================
-- SAHAAYA – People's Savings Network
-- Migration 003: Seed Data
-- ============================================================
-- PROTOTYPE DATA — For development and demonstration purposes only.
-- Remove or replace before production launch.
-- ============================================================

BEGIN;

-- ============================================================
-- PROTOTYPE DATA: Categories (8)
-- ============================================================
INSERT INTO categories (id, name, slug, icon, sort_order, is_active) VALUES
  ('11111111-1111-1111-1111-111111111001', 'Groceries',        'groceries',       '🛒', 1,  true),
  ('11111111-1111-1111-1111-111111111002', 'Pulses & Lentils', 'pulses-lentils',  '🫘', 2,  true),
  ('11111111-1111-1111-1111-111111111003', 'Cooking Oil',      'cooking-oil',     '🫙', 3,  true),
  ('11111111-1111-1111-1111-111111111004', 'Spices',           'spices',          '🌶️', 4,  true),
  ('11111111-1111-1111-1111-111111111005', 'Personal Care',    'personal-care',   '🧴', 5,  true),
  ('11111111-1111-1111-1111-111111111006', 'Household',        'household',       '🏠', 6,  true),
  ('11111111-1111-1111-1111-111111111007', 'Stationery',       'stationery',      '📚', 7,  true),
  ('11111111-1111-1111-1111-111111111008', 'Health',           'health',          '💊', 8,  true);

-- ============================================================
-- PROTOTYPE DATA: Courses (5)
-- ============================================================
INSERT INTO courses (id, title, description, instructor, duration_hours, is_free, price, category, level, thumbnail_url, is_active, created_at) VALUES
  (
    '33333333-3333-3333-3333-333333333001',
    'Web Development Fundamentals',
    'Learn HTML, CSS, JavaScript, and build your first website. Perfect for beginners with no prior coding experience. Covers responsive design, basic DOM manipulation, and deploying your site online.',
    'Ravi Shankar',
    40,
    true,
    0.00,
    'Technology',
    'beginner',
    'https://sahaaya.in/thumbnails/web-dev.jpg',
    true,
    NOW() - INTERVAL '30 days'
  ),
  (
    '33333333-3333-3333-3333-333333333002',
    'Digital Marketing & Social Media',
    'Master Facebook Ads, Instagram marketing, Google Ads, SEO basics, and content strategy. Learn how to run campaigns for small businesses and startups on a tight budget.',
    'Priya Nair',
    25,
    true,
    0.00,
    'Marketing',
    'beginner',
    'https://sahaaya.in/thumbnails/digital-marketing.jpg',
    true,
    NOW() - INTERVAL '25 days'
  ),
  (
    '33333333-3333-3333-3333-333333333003',
    'Tally Prime & Accounting Basics',
    'Complete guide to Tally Prime for small business accounting. Covers GST filing, invoice creation, payroll management, balance sheets, and profit & loss statements. Industry-relevant certification prep.',
    'Suresh Kumar',
    30,
    false,
    199.00,
    'Finance',
    'beginner',
    'https://sahaaya.in/thumbnails/tally.jpg',
    true,
    NOW() - INTERVAL '20 days'
  ),
  (
    '33333333-3333-3333-3333-333333333004',
    'Spoken English for Confident Communication',
    'Build confidence in everyday English conversation, job interviews, and workplace communication. Includes pronunciation tips, common phrases, and practice exercises with Indian English context.',
    'Anjali Mehta',
    20,
    true,
    0.00,
    'Language',
    'beginner',
    'https://sahaaya.in/thumbnails/spoken-english.jpg',
    true,
    NOW() - INTERVAL '15 days'
  ),
  (
    '33333333-3333-3333-3333-333333333005',
    'Basic Computer Skills',
    'From zero to functional: learn MS Office (Word, Excel, PowerPoint), internet browsing, email usage, and online safety. Designed for first-time computer users and homemakers returning to the workforce.',
    'Mohammed Irfan',
    15,
    true,
    0.00,
    'Technology',
    'beginner',
    'https://sahaaya.in/thumbnails/basic-computer.jpg',
    true,
    NOW() - INTERVAL '10 days'
  );

-- ============================================================
-- PROTOTYPE DATA: Jobs & Internships (5)
-- ============================================================
INSERT INTO jobs (id, company, title, type, location, is_remote, stipend_min, stipend_max, description, requirements, deadline, is_active, created_at) VALUES
  (
    '44444444-4444-4444-4444-444444444001',
    'Swiggy',
    'Data Analytics Intern',
    'internship',
    'Hyderabad, Telangana',
    false,
    8000,
    12000,
    'Join Swiggy''s analytics team to work on real delivery data. You will build dashboards, analyze customer behavior, and present insights to business teams. 3-month internship with potential for full-time conversion.',
    'Pursuing B.Com / BBA / MBA. Basic Excel or SQL knowledge preferred. Good communication skills.',
    (CURRENT_DATE + INTERVAL '30 days')::date,
    true,
    NOW() - INTERVAL '5 days'
  ),
  (
    '44444444-4444-4444-4444-444444444002',
    'Zoho Corporation',
    'Junior Software Developer',
    'job',
    'Hyderabad, Telangana',
    false,
    300000,
    450000,
    'Build and maintain web applications using Zoho''s internal stack. Work with cross-functional teams to deliver features for Zoho''s suite of business products. Great learning environment with mentorship.',
    'B.Tech/B.E. in CS or related field. Knowledge of Java or JavaScript. Freshers welcome.',
    (CURRENT_DATE + INTERVAL '45 days')::date,
    true,
    NOW() - INTERVAL '3 days'
  ),
  (
    '44444444-4444-4444-4444-444444444003',
    'Deloitte India',
    'Finance & Accounting Intern',
    'internship',
    'Hyderabad, Telangana',
    false,
    10000,
    15000,
    'Assist senior accountants with client audits, GST reconciliation, and financial reporting. Gain hands-on exposure to Big-4 accounting practices. Certificate provided on completion.',
    'B.Com / M.Com / CA Foundation cleared. Proficiency in Tally or SAP is a plus.',
    (CURRENT_DATE + INTERVAL '20 days')::date,
    true,
    NOW() - INTERVAL '7 days'
  ),
  (
    '44444444-4444-4444-4444-444444444004',
    'upGrad',
    'Content Writer (Remote)',
    'job',
    'Remote',
    true,
    180000,
    300000,
    'Create engaging educational content for upGrad''s online learning platform. Write blog posts, course descriptions, assessments, and marketing copy. Must be able to write clearly on tech, finance, or career topics.',
    'Graduate in any stream. Excellent written English. Portfolio of 3+ writing samples required. 1 year experience preferred but not mandatory.',
    (CURRENT_DATE + INTERVAL '15 days')::date,
    true,
    NOW() - INTERVAL '2 days'
  ),
  (
    '44444444-4444-4444-4444-444444444005',
    'HDFC Bank',
    'Customer Relationship Executive',
    'job',
    'Hyderabad, Telangana',
    false,
    240000,
    360000,
    'Handle customer queries at the branch, assist with account opening and banking products. Build long-term relationships with individual and business customers. Full training provided.',
    'Graduate in any stream. Good communication skills in Telugu and English. Freshers with positive attitude preferred.',
    (CURRENT_DATE + INTERVAL '25 days')::date,
    true,
    NOW() - INTERVAL '1 day'
  );

-- ============================================================
-- PROTOTYPE DATA: Scholarships (3)
-- ============================================================
INSERT INTO scholarships (id, title, provider, amount, deadline, eligibility, description, apply_url, is_active, created_at) VALUES
  (
    '55555555-5555-5555-5555-555555555001',
    'National Scholarship Portal – Post-Matric Scholarship',
    'Ministry of Education, Government of India',
    25000.00,
    (CURRENT_DATE + INTERVAL '60 days')::date,
    'Students from SC/ST/OBC/Minority communities. Annual family income below ₹2.5 lakhs. Must be enrolled in a recognized institution for Class 11 or above.',
    'The National Scholarship Portal (NSP) Post-Matric Scholarship provides financial support to meritorious students from disadvantaged communities. Covers tuition fees and living expenses up to ₹25,000 per year.',
    'https://scholarships.gov.in',
    true,
    NOW() - INTERVAL '10 days'
  ),
  (
    '55555555-5555-5555-5555-555555555002',
    'Telangana State Merit Scholarship',
    'Telangana State Government – BC Welfare Department',
    18000.00,
    (CURRENT_DATE + INTERVAL '45 days')::date,
    'Domicile of Telangana state. Minimum 60% marks in previous exam. Annual family income below ₹1.5 lakhs. For students in degree, diploma, or professional courses.',
    'Provided by the Telangana BC Welfare Department to support students from backward classes in pursuing higher education. Amount covers annual tuition and study materials.',
    'https://telanganaepass.cgg.gov.in',
    true,
    NOW() - INTERVAL '5 days'
  ),
  (
    '55555555-5555-5555-5555-555555555003',
    'Buddy4Study – SAHAAYA Youth Empowerment Grant',
    'SAHAAYA Foundation (Prototype Partner)',
    10000.00,
    (CURRENT_DATE + INTERVAL '30 days')::date,
    'Youth aged 18–25. Family income below ₹3 lakhs per annum. Must be enrolled in a vocational or professional course. Preference given to first-generation learners.',
    'SAHAAYA''s youth empowerment grant supports first-generation learners in vocational and professional courses. Recipients receive ₹10,000 and mentorship from industry professionals for 6 months.',
    'https://sahaaya.in/scholarships/youth-grant',
    true,
    NOW()
  );

-- ============================================================
-- PROTOTYPE DATA: Products (15) — requires a demo seller
-- We insert a placeholder seller without a real user_id; in
-- production this will be replaced by actual seller records.
-- ============================================================

-- Placeholder seller (references a known demo profile UUID)
-- NOTE: In a real Supabase project you must first create a user
-- in auth.users and a corresponding profile row, then use that
-- UUID below. This seed assumes the following demo admin UUID:
--   demo_seller_id: 22222222-2222-2222-2222-222222222001
-- You can update this after running the seed if needed.

-- We use ON CONFLICT DO NOTHING so re-running seed is safe.
INSERT INTO sellers (id, user_id, business_name, gst_number, address, city, state, verification_status, rating, total_reviews, created_at, updated_at)
VALUES (
  '22222222-2222-2222-2222-222222222001',
  -- This references a profile that must exist; create it via Supabase Auth + profile trigger.
  -- Replace with actual user UUID before running in a live project.
  '00000000-0000-0000-0000-000000000001',
  'Sahaaya Demo Store',
  '36AABCS1429B1ZB',
  '123 Begum Bazaar',
  'Hyderabad',
  'Telangana',
  'verified',
  4.50,
  128,
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- PROTOTYPE DATA: Products (15 Indian staples)
-- ============================================================
INSERT INTO products (id, seller_id, category_id, name, description, original_price, discounted_price, discount_percentage, unit, stock_quantity, images, is_active, is_moderated, created_at, updated_at) VALUES

-- Groceries
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa001',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111001',
  'Sona Masoori Rice',
  'Premium quality Sona Masoori rice from Andhra Pradesh. Light, fluffy, and low in starch. Ideal for everyday cooking, biryanis, and idlis. 26 kg bag for large families.',
  1450.00, 1299.00, 10.41,
  '26 kg bag', 150,
  ARRAY['https://sahaaya.in/products/sona-masoori-26kg.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa002',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111001',
  'Basmati Rice (India Gate Classic)',
  'India Gate Classic Basmati Rice — long grain, aromatic, and fluffy. Perfect for biryanis, pulaos, and fried rice. Aged for 2 years for enhanced aroma and texture.',
  699.00, 629.00, 10.01,
  '5 kg bag', 200,
  ARRAY['https://sahaaya.in/products/basmati-india-gate.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa003',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111001',
  'Ponni Rice',
  'South Indian favourite Ponni Boiled Rice. High nutrition retention, easier to digest, and ideal for sambar rice and curd rice. Sourced directly from Tamil Nadu farmers.',
  850.00, 779.00, 8.35,
  '10 kg bag', 180,
  ARRAY['https://sahaaya.in/products/ponni-rice-10kg.jpg'],
  true, true, NOW(), NOW()
),

-- Pulses & Lentils
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa004',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111002',
  'Toor Dal (Arhar Dal)',
  'Premium whole toor dal (pigeon pea lentils) sourced from Maharashtra. Rich in protein and fibre. Ideal for sambar, dal tadka, and rasam. No preservatives added.',
  185.00, 165.00, 10.81,
  '1 kg pack', 300,
  ARRAY['https://sahaaya.in/products/toor-dal-1kg.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa005',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111002',
  'Chana Dal (Split Bengal Gram)',
  'Split Bengal gram dal — high in protein, great for dal, chutney, and snacks like sundal. Carefully sorted and cleaned. Available in bulk for cost savings.',
  145.00, 129.00, 11.03,
  '1 kg pack', 250,
  ARRAY['https://sahaaya.in/products/chana-dal-1kg.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa006',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111002',
  'Masoor Dal (Red Lentils)',
  'Red masoor dal — quick-cooking, nutrition-dense lentils perfect for soups, khichdi, and everyday dal. No hulling, retains all nutrients. Grown in Madhya Pradesh.',
  120.00, 105.00, 12.50,
  '1 kg pack', 200,
  ARRAY['https://sahaaya.in/products/masoor-dal-1kg.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa007',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111002',
  'Moong Dal (Split Green Gram)',
  'Dhuli moong dal — light, easy to digest, and ideal for khichdi, dal soup, and breakfast dishes. High protein content. Cold-pressed clean pack with no added colour.',
  155.00, 139.00, 10.32,
  '1 kg pack', 180,
  ARRAY['https://sahaaya.in/products/moong-dal-1kg.jpg'],
  true, true, NOW(), NOW()
),

-- Cooking Oil
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa008',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111003',
  'Kachchi Ghani Mustard Oil',
  'Cold-pressed (Kachchi Ghani) pure mustard oil from Rajasthan. Pungent, flavourful, and traditionally used in North and East Indian cooking. Rich in omega-3 fatty acids. Ideal for pickling and frying.',
  299.00, 269.00, 10.03,
  '1 litre tin', 120,
  ARRAY['https://sahaaya.in/products/mustard-oil-1l.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa009',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111003',
  'Sunflower Refined Oil',
  'Light, heart-healthy sunflower refined oil with high smoke point. Ideal for deep frying, sautéing, and baking. Cholesterol-free and low in saturated fats. Fortified with Vitamin A & D.',
  185.00, 169.00, 8.65,
  '1 litre bottle', 160,
  ARRAY['https://sahaaya.in/products/sunflower-oil-1l.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa010',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111003',
  'Pure Desi Ghee (Cow)',
  'Bilona method pure desi cow ghee. Grainy texture, golden colour, and deep nutty aroma. Made from cultured butter from grass-fed cows in Telangana. No vegetable fat blending.',
  699.00, 629.00, 10.01,
  '500 ml jar', 80,
  ARRAY['https://sahaaya.in/products/desi-ghee-500ml.jpg'],
  true, true, NOW(), NOW()
),

-- Spices
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa011',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111004',
  'Turmeric Powder (Haldi)',
  'Erode Salem turmeric powder — high curcumin content (3%+), vibrant golden colour, and deep earthy aroma. Lab-tested, no artificial colour or adulteration. Essential kitchen staple.',
  85.00, 75.00, 11.76,
  '200 g pack', 400,
  ARRAY['https://sahaaya.in/products/turmeric-200g.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa012',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111004',
  'Red Chilli Powder (Byadgi)',
  'Byadgi variety red chilli powder — known for deep colour and mild heat. Used extensively in South Indian curries, chutneys, and masalas. Sun-dried and stone-ground.',
  120.00, 105.00, 12.50,
  '200 g pack', 350,
  ARRAY['https://sahaaya.in/products/red-chilli-200g.jpg'],
  true, true, NOW(), NOW()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa013',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111004',
  'Coriander Powder (Dhaniya)',
  'Fresh ground coriander powder with a warm citrusy flavour. Essential base spice for all Indian curries. Sourced from Rajasthan coriander farms. No staleness — packed fresh weekly.',
  70.00, 60.00, 14.29,
  '200 g pack', 300,
  ARRAY['https://sahaaya.in/products/coriander-200g.jpg'],
  true, true, NOW(), NOW()
),

-- Personal Care
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa014',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111005',
  'Neem & Tulsi Handmade Soap',
  'Handcrafted cold-process soap with neem leaf extract, tulsi (basil) essential oil, and coconut oil base. Antibacterial, gentle on skin, and pH-balanced. 100% natural, no SLS/parabens.',
  65.00, 55.00, 15.38,
  '100 g bar', 500,
  ARRAY['https://sahaaya.in/products/neem-tulsi-soap.jpg'],
  true, true, NOW(), NOW()
),

-- Health
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaa015',
  '22222222-2222-2222-2222-222222222001',
  '11111111-1111-1111-1111-111111111008',
  'Chyawanprash (Dabur)',
  'Dabur Chyawanprash — 41 Ayurvedic herbs including amla, ashwagandha, and saffron. Builds immunity, improves digestion, and boosts energy. Suitable for all age groups. 1 kg value pack.',
  499.00, 449.00, 10.02,
  '1 kg jar', 90,
  ARRAY['https://sahaaya.in/products/dabur-chyawanprash-1kg.jpg'],
  true, true, NOW(), NOW()
);

COMMIT;
