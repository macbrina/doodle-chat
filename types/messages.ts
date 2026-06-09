import { z } from "zod";

import {
  createMessageSchema,
  fetchMessagesParamsSchema,
  messageSchema,
} from "@/lib/schemas/message";

export type Message = z.infer<typeof messageSchema>;
export type CreateMessageRequest = z.infer<typeof createMessageSchema>;
export type FetchMessagesQuery = z.infer<typeof fetchMessagesParamsSchema>;
