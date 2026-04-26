-- Add featured jobs support
-- This migration adds columns to track featured job listings and their expiration

ALTER TABLE jobs ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS featured_until TIMESTAMPTZ;

-- Create index for efficient queries on featured jobs
CREATE INDEX IF NOT EXISTS idx_jobs_is_featured ON jobs(is_featured);

-- Create index for finding expired featured listings
CREATE INDEX IF NOT EXISTS idx_jobs_featured_until ON jobs(featured_until) WHERE is_featured = true;

-- Add premium subscriptions table to track user subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_type TEXT NOT NULL CHECK (subscription_type IN ('free', 'premium')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  lemon_squeezy_subscription_id TEXT UNIQUE,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Add indexes for subscription queries
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_lemon_id ON user_subscriptions(lemon_squeezy_subscription_id);

-- Add job posting orders table to track purchases
CREATE TABLE IF NOT EXISTS job_posting_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'featured', 'bundle_3')),
  lemon_squeezy_order_id TEXT UNIQUE,
  amount_paid DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  jobs_remaining INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add indexes for order queries
CREATE INDEX IF NOT EXISTS idx_job_posting_orders_user_id ON job_posting_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_job_posting_orders_status ON job_posting_orders(status);
CREATE INDEX IF NOT EXISTS idx_job_posting_orders_expires_at ON job_posting_orders(expires_at);

-- Add function to clean up expired featured jobs
CREATE OR REPLACE FUNCTION mark_expired_featured_jobs()
RETURNS void AS $$
BEGIN
  UPDATE jobs
  SET is_featured = false
  WHERE is_featured = true AND featured_until IS NOT NULL AND featured_until < now();
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_posting_orders_updated_at
BEFORE UPDATE ON job_posting_orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
