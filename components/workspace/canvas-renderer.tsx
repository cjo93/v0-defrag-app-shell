Yes. Move to the repo now.

Because your shell is already built on a Next.js App Router structure and is conceptually aligned with the Vercel chatbot template, the fastest credible path is to add a thin persistence/orchestration layer first, then wire artifacts and audio on top of it. The Vercel chatbot template is designed as a full-featured, hackable Next.js AI app shell with App Router, AI SDK patterns, auth/persistence hooks, and file storage patterns, so it is the right foundation for this phase. OpenAI’s current docs also support both an Agents-oriented orchestration layer and text-to-speech for the audio features you want.  ￼

0. Install the next dependencies

pnpm add @supabase/supabase-js @supabase/ssr openai ai @ai-sdk/openai zod

If your exported repo already includes ai, @ai-sdk/openai, or zod, keep the existing versions.

⸻

1. Supabase migration SQL

Create:

supabase/migrations/0001_defrag_core.sql

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


⸻

2. Supabase clients

Create:

lib/supabase/server.ts

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Server Actions / route handlers can extend this later if needed.
        },
      },
    }
  );
}

Create:

lib/supabase/admin.ts

import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);


⸻

3. Shared Defrag schemas

Create:

lib/defrag/schemas.ts

import { z } from "zod";

export const RationaleBlockSchema = z.object({
  label: z.string(),
  summary: z.string(),
  details: z.array(z.string()).default([]),
});

export const DefragStructuredResponseSchema = z.object({
  responseText: z.string(),
  relationalStatus: z.enum(["aligned", "diverging", "uncertain"]),
  suggestedNextStep: z.string(),
  shouldOpenBranch: z.boolean().default(false),
  suggestedArtifact: z.enum([
    "none",
    "relational_map",
    "simulation",
    "timing_view",
    "family_system",
    "educational",
    "brief",
  ]),
  rationale: z.array(RationaleBlockSchema).default([]),
  educationalLayer: z
    .object({
      title: z.string(),
      summary: z.string(),
      kind: z.enum([
        "psychological_dynamics",
        "coping",
        "emotional_processing",
        "healing",
        "generational_patterns",
        "communication_under_pressure",
      ]),
    })
    .nullable()
    .default(null),
});

export type DefragStructuredResponse = z.infer<
  typeof DefragStructuredResponseSchema
>;


⸻

4. Agent/orchestration layer

Your repo is already aligned with Vercel’s AI SDK-style architecture, so the most practical first step is a server-side orchestration layer that returns structured outputs and can later be swapped or expanded into a fuller Agents SDK setup if you want. That keeps implementation velocity high while staying consistent with the current shell and official platform patterns.  ￼

Create:

lib/defrag/agent.ts

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  DefragStructuredResponseSchema,
  type DefragStructuredResponse,
} from "./schemas";

type RunDefragAgentInput = {
  userMessage: string;
  workspaceTitle?: string;
  threadKind: "primary" | "branch";
};

export async function runDefragAgent(
  input: RunDefragAgentInput
): Promise<DefragStructuredResponse> {
  const system = `
You are Defrag, a relational intelligence system.
Write in plain, human, anti-stigma language.
Do not diagnose.
Keep framework evidence secondary and structured.
Return concise, useful, product-ready output.
`;

  const prompt = `
Workspace: ${input.workspaceTitle ?? "Untitled workspace"}
Thread kind: ${input.threadKind}

User message:
${input.userMessage}
`;

  const result = await generateObject({
    model: openai(process.env.OPENAI_MODEL_PRIMARY || "gpt-4.1-mini"),
    schema: DefragStructuredResponseSchema,
    system,
    prompt,
  });

  return result.object;
}


⸻

5. API route: create workspace

Create:

app/api/workspaces/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const title = body.title || "Untitled workspace";

  const { data: workspace, error } = await supabaseAdmin
    .from("workspaces")
    .insert({ user_id: user.id, title })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { error: threadError } = await supabaseAdmin.from("threads").insert([
    { workspace_id: workspace.id, kind: "primary", title: "Primary" },
  ]);

  if (threadError) {
    return NextResponse.json({ error: threadError.message }, { status: 500 });
  }

  return NextResponse.json({ workspace });
}


⸻

6. API route: post message and get structured AI response

Create:

app/api/threads/[threadId]/messages/route.ts

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { runDefragAgent } from "@/lib/defrag/agent";

type Params = { params: Promise<{ threadId: string }> };

export async function POST(req: Request, { params }: Params) {
  const { threadId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();

  const { data: thread, error: threadError } = await supabaseAdmin
    .from("threads")
    .select("id, kind, workspace:workspaces(id, title, user_id)")
    .eq("id", threadId)
    .single();

  if (threadError || !thread || thread.workspace.user_id !== user.id) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  const { data: userMessage, error: userMsgError } = await supabaseAdmin
    .from("messages")
    .insert({
      thread_id: threadId,
      role: "user",
      content,
    })
    .select("*")
    .single();

  if (userMsgError) {
    return NextResponse.json({ error: userMsgError.message }, { status: 500 });
  }

  const structured = await runDefragAgent({
    userMessage: content,
    workspaceTitle: thread.workspace.title,
    threadKind: thread.kind,
  });

  const { data: assistantMessage, error: assistantMsgError } =
    await supabaseAdmin
      .from("messages")
      .insert({
        thread_id: threadId,
        role: "assistant",
        content: structured.responseText,
        structured_output: structured,
      })
      .select("*")
      .single();

  if (assistantMsgError) {
    return NextResponse.json(
      { error: assistantMsgError.message },
      { status: 500 }
    );
  }

  if (structured.rationale.length > 0) {
    await supabaseAdmin.from("rationale_blocks").insert(
      structured.rationale.map((r) => ({
        message_id: assistantMessage.id,
        label: r.label,
        payload: r,
      }))
    );
  }

  return NextResponse.json({
    userMessage,
    assistantMessage,
    structured,
  });
}


⸻

7. First working artifact flow

Create:

app/api/artifacts/generate/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId, threadId, kind, title } = await req.json();

  const { data: workspace, error: workspaceError } = await supabaseAdmin
    .from("workspaces")
    .select("id, user_id")
    .eq("id", workspaceId)
    .single();

  if (workspaceError || !workspace || workspace.user_id !== user.id) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const { data: artifact, error } = await supabaseAdmin
    .from("artifacts")
    .insert({
      workspace_id: workspaceId,
      source_thread_id: threadId ?? null,
      kind,
      title: title ?? "Generated artifact",
      status: "ready",
      payload: getSeedPayload(kind),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ artifact });
}

function getSeedPayload(kind: string) {
  switch (kind) {
    case "relational_map":
      return {
        nodes: [
          { id: "self", label: "You", x: 120, y: 140 },
          { id: "other", label: "Other person", x: 420, y: 140 },
        ],
        edges: [{ from: "self", to: "other", label: "Meaning split" }],
      };
    case "timing_view":
      return {
        title: "Timing pressure view",
        items: [
          { label: "Current pressure", level: "high" },
          { label: "Best next move", level: "pause and clarify" },
        ],
      };
    case "family_system":
      return {
        title: "Family system view",
        members: [
          { id: "a", label: "You" },
          { id: "b", label: "Parent / partner" },
        ],
      };
    case "educational":
      return {
        title: "Educational explainer",
        summary:
          "Many people experience moments where intent and impact split under pressure.",
      };
    default:
      return { title: "Artifact", summary: "Structured output ready." };
  }
}

This gives you a first real “Generate artifact” path without waiting on full graph or video logic.

⸻

8. TTS route

OpenAI’s current text-to-speech guide supports generating speech from text, so the right pattern is a small server route that turns a brief or artifact summary into audio. The real storage/caching layer can come next; this first route gets the core wiring in place.  ￼

Create:

app/api/audio/tts/route.ts

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { text } = await req.json();

  const mp3 = await openai.audio.speech.create({
    model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
    voice: "alloy",
    input: text,
  });

  const audioBuffer = Buffer.from(await mp3.arrayBuffer());

  return new Response(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}


⸻

9. Production-ready canvas renderer

Create:

components/workspace/canvas-renderer.tsx

"use client";

type Artifact = {
  id: string;
  kind:
    | "relational_map"
    | "family_system"
    | "timing_view"
    | "simulation"
    | "brief"
    | "educational"
    | "video_explainer";
  status: "queued" | "generating" | "ready" | "failed";
  title?: string;
  payload: any;
};

export function CanvasRenderer({ artifact }: { artifact: Artifact | null }) {
  if (!artifact) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Select or generate an artifact to view the relational field.
      </div>
    );
  }

  if (artifact.status === "queued" || artifact.status === "generating") {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        {artifact.status === "queued" ? "Queued…" : "Generating…"}
      </div>
    );
  }

  if (artifact.status === "failed") {
    return (
      <div className="flex h-full items-center justify-center text-sm text-destructive">
        Artifact failed to generate.
      </div>
    );
  }

  switch (artifact.kind) {
    case "relational_map":
      return <RelationalMap payload={artifact.payload} />;
    case "family_system":
      return <FamilySystemView payload={artifact.payload} />;
    case "timing_view":
      return <TimingView payload={artifact.payload} />;
    case "educational":
      return <EducationalView payload={artifact.payload} />;
    default:
      return <GenericArtifactView payload={artifact.payload} title={artifact.title} />;
  }
}

function RelationalMap({ payload }: { payload: any }) {
  const nodes = payload.nodes ?? [];
  const edges = payload.edges ?? [];

  return (
    <svg viewBox="0 0 600 300" className="h-full w-full">
      {edges.map((edge: any, i: number) => {
        const from = nodes.find((n: any) => n.id === edge.from);
        const to = nodes.find((n: any) => n.id === edge.to);
        if (!from || !to) return null;

        return (
          <g key={i}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              opacity="0.3"
            />
            <text
              x={(from.x + to.x) / 2}
              y={(from.y + to.y) / 2 - 8}
              textAnchor="middle"
              className="fill-current text-[10px]"
            >
              {edge.label}
            </text>
          </g>
        );
      })}
      {nodes.map((node: any) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="28" fill="currentColor" opacity="0.08" />
          <circle cx={node.x} cy={node.y} r="18" fill="currentColor" opacity="0.2" />
          <text x={node.x} y={node.y + 44} textAnchor="middle" className="fill-current text-xs">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FamilySystemView({ payload }: { payload: any }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{payload.title ?? "Family system"}</h3>
      {(payload.members ?? []).map((m: any) => (
        <div key={m.id} className="rounded-xl border p-3 text-sm">
          {m.label}
        </div>
      ))}
    </div>
  );
}

function TimingView({ payload }: { payload: any }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{payload.title ?? "Timing view"}</h3>
      {(payload.items ?? []).map((item: any, i: number) => (
        <div key={i} className="rounded-xl border p-3 text-sm">
          <div className="font-medium">{item.label}</div>
          <div className="text-muted-foreground">{item.level}</div>
        </div>
      ))}
    </div>
  );
}

function EducationalView({ payload }: { payload: any }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{payload.title}</h3>
      <p className="text-sm text-muted-foreground">{payload.summary}</p>
    </div>
  );
}

function GenericArtifactView({
  payload,
  title,
}: {
  payload: any;
  title?: string;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{title ?? "Artifact"}</h3>
      <pre className="overflow-auto rounded-xl border p-3 text-xs">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
}


⸻

10. Immediate implementation order

Do this next, in order:
	1.	Run the SQL migration.
	2.	Add the Supabase clients.
	3.	Add the schema + orchestration files.
	4.	Wire POST /api/threads/[threadId]/messages.
	5.	Wire POST /api/artifacts/generate.
	6.	Mount CanvasRenderer into your existing workspace canvas panel.
	7.	Add the TTS route for Briefs.

That gets you to:
	•	real user workspaces
	•	real threads
	•	structured assistant outputs
	•	real “Based on” data
	•	first generated artifacts
	•	first real audio path

If you want, next I’ll give you the exact front-end wiring for:
	•	posting a chat message
	•	rendering the structured response
	•	showing the “Based on” disclosure from database data
	•	triggering artifact generation from the workspace UI