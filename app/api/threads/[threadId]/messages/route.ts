import { NextResponse } from "next/server";

type Params = { params: Promise<{ threadId: string }> };

export async function POST(_: Request, { params }: Params) {
  const { threadId } = await params;

  return NextResponse.json(
    {
      error:
        "Deprecated route. Use /api/conversation-threads/{threadId}/messages for workspace foundation contract.",
      threadId,
    },
    { status: 410 }
  );
}
