import type {
  CreateMessageRequest,
  Message,
  FetchMessagesQuery,
} from "@/types/messages";

export async function fetchMessages(
  options: FetchMessagesQuery = {},
): Promise<Message[]> {
  const searchParams = new URLSearchParams();

  if (options.limit) searchParams.set("limit", String(options.limit));
  if (options.before) searchParams.set("before", options.before);
  if (options.after) searchParams.set("after", options.after);

  const queryString = searchParams.toString();
  const url = `/api/messages${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}

export async function sendMessage(
  payload: CreateMessageRequest,
): Promise<Message> {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}
