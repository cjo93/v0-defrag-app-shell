create table if not exists people_roster (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  role text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists people_roster_user_name_role_idx
  on people_roster(user_id, name, role);

create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null default 'Untitled conversation',
  active_person_id uuid references people_roster(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists conversation_threads (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  kind text not null check (kind in ('primary', 'branch')),
  parent_thread_id uuid references conversation_threads(id) on delete set null,
  title text not null default 'Thread',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table messages
  add column if not exists conversation_id uuid references conversations(id) on delete cascade,
  add column if not exists conversation_thread_id uuid references conversation_threads(id) on delete cascade,
  add column if not exists analysis_id uuid,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create table if not exists analyses (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  thread_id uuid not null references conversation_threads(id) on delete cascade,
  user_message_id uuid references messages(id) on delete set null,
  assistant_message_id uuid references messages(id) on delete set null,
  status text not null default 'ready' check (status in ('queued', 'ready', 'failed')),
  shared_session_state jsonb not null default '{}'::jsonb,
  branch_suggestion jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table messages
  add constraint if not exists messages_analysis_id_fkey
  foreign key (analysis_id) references analyses(id) on delete set null;

create table if not exists canvas_snapshots (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  analysis_id uuid references analyses(id) on delete set null,
  source_thread_id uuid references conversation_threads(id) on delete set null,
  mode text not null check (mode in ('live_system_state', 'video_explainer', 'audio_overview', 'visual_infographic')),
  title text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table people_roster enable row level security;
alter table conversations enable row level security;
alter table conversation_threads enable row level security;
alter table analyses enable row level security;
alter table canvas_snapshots enable row level security;

create policy "people roster own row"
on people_roster for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "conversations own row"
on conversations for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "threads through conversation ownership"
on conversation_threads for all
using (
  exists (
    select 1 from conversations c
    where c.id = conversation_threads.conversation_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from conversations c
    where c.id = conversation_threads.conversation_id
      and c.user_id = auth.uid()
  )
);

create policy "messages through conversation ownership"
on messages for all
using (
  conversation_id is not null
  and exists (
    select 1 from conversations c
    where c.id = messages.conversation_id
      and c.user_id = auth.uid()
  )
)
with check (
  conversation_id is not null
  and exists (
    select 1 from conversations c
    where c.id = messages.conversation_id
      and c.user_id = auth.uid()
  )
);

create policy "analyses through conversation ownership"
on analyses for all
using (
  exists (
    select 1 from conversations c
    where c.id = analyses.conversation_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from conversations c
    where c.id = analyses.conversation_id
      and c.user_id = auth.uid()
  )
);

create policy "snapshots through conversation ownership"
on canvas_snapshots for all
using (
  exists (
    select 1 from conversations c
    where c.id = canvas_snapshots.conversation_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from conversations c
    where c.id = canvas_snapshots.conversation_id
      and c.user_id = auth.uid()
  )
);
