create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key,
  email text unique,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists workspaces (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null default 'Untitled workspace',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists threads (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  kind text not null check (kind in ('primary', 'branch')),
  parent_thread_id uuid references threads(id) on delete set null,
  title text,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  thread_id uuid not null references threads(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null default '',
  structured_output jsonb,
  created_at timestamptz not null default now()
);

create table if not exists artifacts (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  source_thread_id uuid references threads(id) on delete set null,
  kind text not null check (kind in ('relational_map', 'family_system', 'timing_view', 'simulation', 'brief', 'educational', 'video_explainer')),
  status text not null check (status in ('queued', 'generating', 'ready', 'failed')) default 'queued',
  title text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists rationale_blocks (
  id uuid primary key default uuid_generate_v4(),
  message_id uuid not null references messages(id) on delete cascade,
  label text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists briefs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  summary text not null,
  payload jsonb not null default '{}'::jsonb,
  audio_status text not null check (audio_status in ('none', 'queued', 'ready', 'failed')) default 'none',
  created_at timestamptz not null default now()
);

create table if not exists baseline_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references profiles(id) on delete cascade,
  plain_language_summary jsonb not null default '{}'::jsonb,
  insight_layers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table workspaces enable row level security;
alter table threads enable row level security;
alter table messages enable row level security;
alter table artifacts enable row level security;
alter table rationale_blocks enable row level security;
alter table briefs enable row level security;
alter table baseline_profiles enable row level security;

create policy "profiles own row"
on profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "workspaces own row"
on workspaces for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "threads through workspace ownership"
on threads for all
using (
  exists (
    select 1 from workspaces w
    where w.id = threads.workspace_id
      and w.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from workspaces w
    where w.id = threads.workspace_id
      and w.user_id = auth.uid()
  )
);

create policy "messages through thread ownership"
on messages for all
using (
  exists (
    select 1
    from threads t
    join workspaces w on w.id = t.workspace_id
    where t.id = messages.thread_id
      and w.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from threads t
    join workspaces w on w.id = t.workspace_id
    where t.id = messages.thread_id
      and w.user_id = auth.uid()
  )
);

create policy "artifacts through workspace ownership"
on artifacts for all
using (
  exists (
    select 1 from workspaces w
    where w.id = artifacts.workspace_id
      and w.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from workspaces w
    where w.id = artifacts.workspace_id
      and w.user_id = auth.uid()
  )
);

create policy "rationale through message ownership"
on rationale_blocks for all
using (
  exists (
    select 1
    from messages m
    join threads t on t.id = m.thread_id
    join workspaces w on w.id = t.workspace_id
    where m.id = rationale_blocks.message_id
      and w.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from messages m
    join threads t on t.id = m.thread_id
    join workspaces w on w.id = t.workspace_id
    where m.id = rationale_blocks.message_id
      and w.user_id = auth.uid()
  )
);

create policy "briefs own row"
on briefs for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "baseline own row"
on baseline_profiles for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
