import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { PersonRosterRecordSchema } from "@/lib/workspace/contracts";

const CreatePersonSchema = z.object({
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(120),
});

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("people_roster")
    .select("id, name, role")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map((row) => PersonRosterRecordSchema.parse(row)));
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const parsed = CreatePersonSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid roster payload" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("people_roster")
    .insert({
      user_id: user.id,
      ...parsed.data,
    })
    .select("id, name, role")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(PersonRosterRecordSchema.parse(data));
}
