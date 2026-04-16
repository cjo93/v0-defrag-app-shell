create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  status text not null check (status in ('active', 'trialing', 'inactive', 'past_due', 'canceled')) default 'inactive',
  plan_code text not null default 'free',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists subscriptions_user_id_idx
  on subscriptions(user_id);

alter table subscriptions enable row level security;

create policy "subscriptions own row"
on subscriptions for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

alter table analyses
  add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table messages
  alter column metadata set default '{}'::jsonb;
