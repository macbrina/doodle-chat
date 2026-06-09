import { z } from "zod";

import { apiErrorSchema, internalServerErrorSchema } from "@/lib/schemas/api";

export type ApiError = z.infer<typeof apiErrorSchema>;
export type InternalServerError = z.infer<typeof internalServerErrorSchema>;

export type ApiResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      status: number;
      error: ApiError | InternalServerError;
    };
