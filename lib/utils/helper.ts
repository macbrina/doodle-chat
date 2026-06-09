import { ZodError } from "zod";

export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof error.error === "string"
  ) {
    return error.error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return fallback;
}

export function formatZodError(error: ZodError, location: "body" | "query") {
  return {
    error: "Invalid request",
    details: error.issues.map((issue) => ({
      msg: issue.message,
      param: issue.path.join("."),
      location,
    })),
  };
}
