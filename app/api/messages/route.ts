import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  createMessageSchema,
  messageSchema,
  messagesSchema,
  fetchMessagesParamsSchema,
} from "@/lib/schemas/message";
import { createMessage, getMessages } from "@/lib/server/doodle-api";
import { formatZodError } from "@/lib/utils/helper";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = new URL(request.url).searchParams;

    const query = fetchMessagesParamsSchema.parse({
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : undefined,
      after: searchParams.get("after") ?? undefined,
      before: searchParams.get("before") ?? undefined,
    });

    const validatedSearchParams = new URLSearchParams();

    if (query.limit) validatedSearchParams.set("limit", String(query.limit));
    if (query.after) validatedSearchParams.set("after", query.after);
    if (query.before) validatedSearchParams.set("before", query.before);

    const result = await getMessages(validatedSearchParams);

    if (!result.success) {
      return NextResponse.json(result.error, { status: result.status });
    }

    const messages = messagesSchema.parse(result.data);

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(formatZodError(error, "query"), { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const payload = createMessageSchema.parse(body);

    const result = await createMessage(payload);

    if (!result.success) {
      return NextResponse.json(result.error, { status: result.status });
    }

    const createdMessage = messageSchema.parse(result.data);

    return NextResponse.json(createdMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(formatZodError(error, "body"), { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
