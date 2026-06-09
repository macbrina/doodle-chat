import { z } from "zod";
import { CHAT_RULES } from "@/lib/utils/validation";

export const authorSchema = z
  .string()
  .trim()
  .min(CHAT_RULES.author.minLength, "Author is required")
  .max(
    CHAT_RULES.author.maxLength,
    `Author must be less than ${CHAT_RULES.author.maxLength} characters`,
  )
  .regex(
    /^[a-zA-Z0-9\s-_]+$/,
    "Author can only contain letters, numbers, spaces, hyphens, and underscores",
  );

export const messageContentSchema = z
  .string()
  .trim()
  .min(CHAT_RULES.message.minLength, "Message is required")
  .max(
    CHAT_RULES.message.maxLength,
    `Message must be less than ${CHAT_RULES.message.maxLength} characters`,
  );

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

export const fetchMessagesParamsSchema = z
  .object({
    limit: z
      .number()
      .int()
      .positive()
      .min(1, "Limit must be at least 1")
      .max(
        CHAT_RULES.message.maxLimit,
        `Limit must be less than or equal to ${CHAT_RULES.message.maxLimit}`,
      )
      .optional(),
    after: z.string().optional(),
    before: z.string().optional(),
  })
  .refine((data) => !(data.after && data.before), {
    message: 'Cannot use both "after" and "before" parameters simultaneously.',
    path: ["before"],
  });
