import { z } from "zod";

export const authorSchema = z
  .string()
  .trim()
  .min(1, "Author is required")
  .max(50, "Author must be less than 50 characters")
  .regex(
    /^[a-zA-Z0-9\s-_]+$/,
    "Author can only contain letters, numbers, spaces, hyphens, and underscores",
  );

export const messageContentSchema = z
  .string()
  .trim()
  .min(1, "Message is required")
  .max(500, "Message must be less than 500 characters");

export const messageSchema = z.object({
  _id: z.string(),
  message: messageContentSchema,
  author: authorSchema,
  createdAt: z.iso.datetime(),
});

export const messagesSchema = z.array(messageSchema);

export const createMessageSchema = z.object({
  message: messageContentSchema,
  author: authorSchema,
});

export type Message = z.infer<typeof messageSchema>;
export type CreateMessageRequest = z.infer<typeof createMessageSchema>;
