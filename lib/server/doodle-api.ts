import "server-only";

import { createMessageSchema } from "@/lib/schemas/message";
import type { CreateMessageRequest, Message } from "@/types/messages";
import { ApiResult } from "@/types/api";
import { apiErrorSchema, internalServerErrorSchema } from "@/lib/schemas/api";

const DOODLE_API_BASE_URL = process.env.DOODLE_API_BASE_URL;
const DOODLE_API_TOKEN = process.env.DOODLE_API_TOKEN;

function getApiConfig() {
  if (!DOODLE_API_BASE_URL || !DOODLE_API_TOKEN) {
    throw new Error("Doodle API configuration is missing");
  }
  return { baseUrl: DOODLE_API_BASE_URL, token: DOODLE_API_TOKEN };
}

function parseApiError(data: unknown) {
  const apiError = apiErrorSchema.safeParse(data);

  if (apiError.success) {
    return apiError.data;
  }

  const internalError = internalServerErrorSchema.safeParse(data);

  if (internalError.success) {
    return internalError.data;
  }

  return {
    error: "Unexpected API error",
  };
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
      error: parseApiError(data),
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
      error: parseApiError(data),
    };
  }

  return {
    success: true,
    data,
  };
}
