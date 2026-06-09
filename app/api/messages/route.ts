import { NextRequest, NextResponse } from "next/server";

import {
  createMessageSchema,
  messageSchema,
  messagesSchema,
} from "@/lib/schemas/message";
import { createMessage, getMessages } from "@/lib/server/doodle-api";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = new URL(request.url).searchParams;
    const result = await getMessages(searchParams);

    if (!result.success) {
      return NextResponse.json(result.error, { status: result.status });
    }

    const messages = messagesSchema.parse(result.data);

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);

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

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
