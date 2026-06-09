export const CHAT_RULES = {
  author: {
    minLength: 1,
    maxLength: 50,
  },
  message: {
    minLength: 1,
    maxLength: 500,
    defaultLimit: 20,
    maxLimit: 50,
  },
} as const;
