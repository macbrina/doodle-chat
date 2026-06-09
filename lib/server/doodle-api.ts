import "server-only";

import {
  createMessageSchema,
  type CreateMessageRequest,
  type Message,
} from "@/lib/schemas/message";
import { ApiResult } from "@/types/api";

const DOODLE_API_BASE_URL = process.env.DOODLE_API_BASE_URL;
const DOODLE_API_TOKEN = process.env.DOODLE_API_TOKEN;

function getApiConfig() {
  if (!DOODLE_API_BASE_URL || !DOODLE_API_TOKEN) {
    throw new Error("Doodle API configuration is missing");
  }
  return { baseUrl: DOODLE_API_BASE_URL, token: DOODLE_API_TOKEN };
}

export async function getMessages(
  searchParams: URLSearchParams,
): Promise<ApiResult<Message[]>> {
  const { baseUrl, token } = getApiConfig();

  const queryString = searchParams.toString();
  const url = `${baseUrl}/api/v1/messages${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      error: data,
    };
  }

  return {
    success: true,
    data,
  };
}

export async function createMessage(
  body: CreateMessageRequest,
): Promise<ApiResult<Message>> {
  const { baseUrl, token } = getApiConfig();

  const payload = createMessageSchema.parse(body);

  const response = await fetch(`${baseUrl}/api/v1/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      error: data,
    };
  }

  return {
    success: true,
    data,
  };
}
