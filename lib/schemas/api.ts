import { z } from "zod";

export const apiErrorDetailSchema = z.object({
  msg: z.string(),
  param: z.string(),
  location: z.string(),
});

export const apiErrorSchema = z.object({
  error: z.string(),
  details: z.array(apiErrorDetailSchema).optional(),
});

export const internalServerErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    createdAt: z.string().datetime(),
  }),
});
