-- Add billing entitlement fields to profiles
alter table profiles add column if not exists subscription_tier text default 'free';
alter table profiles add column if not exists stripe_customer_id text;
alter table profiles add column if not exists stripe_subscription_status text default 'none';

