-- Add stripe_customer_id column to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN stripe_customer_id TEXT;

-- Create index for faster lookups
CREATE INDEX idx_user_profiles_stripe_customer_id ON user_profiles(stripe_customer_id);