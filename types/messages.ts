import { z } from "zod";

import {
  createMessageSchema,
  fetchMessagesParamsSchema,
  messageSchema,
} from "@/lib/schemas/message";

export interface MessageListProps {
  messages: Message[];
  isLoadingOlderMessages: boolean;
  hasMoreMessages: boolean;
  loadOlderError: string | null;
  onLoadOlderMessages: () => void;
}

export interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export interface MessageComposerProps {
  isSending: boolean;
  sendError: string | null;
  onSendMessage: (payload: CreateMessageRequest) => Promise<boolean>;
}

export interface ChatErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export type Message = z.infer<typeof messageSchema>;
export type CreateMessageRequest = z.infer<typeof createMessageSchema>;
export type FetchMessagesQuery = z.infer<typeof fetchMessagesParamsSchema>;
