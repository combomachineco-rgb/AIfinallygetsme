-- ============================================
-- Supabase Tables and RLS Policies
-- ============================================

-- TABLE: users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT,
    payment_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- TABLE: user_answers
CREATE TABLE IF NOT EXISTS user_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- TABLE: custom_prompts
CREATE TABLE IF NOT EXISTS custom_prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prompt_name TEXT NOT NULL,
    full_prompt TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- Enable Row Level Security
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_prompts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies for users table
-- ============================================

-- Users can SELECT their own record
CREATE POLICY "Users can view own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Users can INSERT their own record (during signup)
CREATE POLICY "Users can insert own data"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

-- Users can UPDATE their own record
CREATE POLICY "Users can update own data"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Users cannot DELETE their own record (or allow if needed)
-- Uncomment if you want users to be able to delete their account
-- CREATE POLICY "Users can delete own data"
-- ON users FOR DELETE
-- USING (auth.uid() = id);

-- ============================================
-- RLS Policies for user_answers table
-- ============================================

-- Users can SELECT their own answers
CREATE POLICY "Users can view own answers"
ON user_answers FOR SELECT
USING (auth.uid() = user_id);

-- Users can INSERT their own answers
CREATE POLICY "Users can insert own answers"
ON user_answers FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can UPDATE their own answers
CREATE POLICY "Users can update own answers"
ON user_answers FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can DELETE their own answers
CREATE POLICY "Users can delete own answers"
ON user_answers FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- RLS Policies for custom_prompts table
-- ============================================

-- Users can SELECT their own prompts
CREATE POLICY "Users can view own prompts"
ON custom_prompts FOR SELECT
USING (auth.uid() = user_id);

-- Users can INSERT their own prompts
CREATE POLICY "Users can insert own prompts"
ON custom_prompts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can UPDATE their own prompts
CREATE POLICY "Users can update own prompts"
ON custom_prompts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can DELETE their own prompts
CREATE POLICY "Users can delete own prompts"
ON custom_prompts FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- Indexes for better performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_user_answers_user_id ON user_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_user_answers_question_number ON user_answers(user_id, question_number);
CREATE INDEX IF NOT EXISTS idx_custom_prompts_user_id ON custom_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);

-- ============================================
-- Optional: Function to automatically link user_id on insert
-- ============================================

-- This function ensures user_id is set to auth.uid() when inserting
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_id IS NULL THEN
        NEW.user_id := auth.uid();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply trigger to user_answers (optional - only if you want auto-set user_id)
-- CREATE TRIGGER set_user_answers_user_id
-- BEFORE INSERT ON user_answers
-- FOR EACH ROW
-- EXECUTE FUNCTION set_user_id();

-- Apply trigger to custom_prompts (optional - only if you want auto-set user_id)
-- CREATE TRIGGER set_custom_prompts_user_id
-- BEFORE INSERT ON custom_prompts
-- FOR EACH ROW
-- EXECUTE FUNCTION set_user_id();

