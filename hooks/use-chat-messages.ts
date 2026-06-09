"use client";

import {
  fetchMessages,
  sendMessage as sendMessageRequest,
} from "@/lib/api/messages";
import { CHAT_RULES } from "@/lib/utils/validation";
import {
  FetchMessagesQuery,
  Message,
  CreateMessageRequest,
} from "@/types/messages";
import { useCallback, useState } from "react";

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(
    async (
      options: FetchMessagesQuery = { limit: CHAT_RULES.message.defaultLimit },
    ) => {
      try {
        setIsLoadingMessages(true);
        setError(null);

        const messages = await fetchMessages(options);

        setMessages(messages);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load messages";
        setError(errorMessage);
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [],
  );

  const sendMessage = async (content: CreateMessageRequest) => {
    try {
      setIsSendingMessage(true);
      setError(null);

      const newMessage = await sendMessageRequest(content);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
      setError(errorMessage);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const loadOlderMessages = useCallback(async () => {
    const oldestMessage = messages[0];

    if (!oldestMessage || isLoadingOlderMessages || !hasMoreMessages) return;

    try {
      setIsLoadingOlderMessages(true);
      setError(null);

      const olderMessages = await fetchMessages({
        limit: CHAT_RULES.message.defaultLimit,
        before: oldestMessage.createdAt,
      });

      setMessages((prevMessages) => {
        const existingIds = new Set(prevMessages.map((message) => message._id));

        const uniqueOlderMessages = olderMessages.filter(
          (message) => !existingIds.has(message._id),
        );

        if (uniqueOlderMessages.length === 0) {
          setHasMoreMessages(false);
          return prevMessages;
        }

        return [...uniqueOlderMessages, ...prevMessages];
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load older messages";

      setError(errorMessage);
    } finally {
      setIsLoadingOlderMessages(false);
    }
  }, [messages, isLoadingOlderMessages, hasMoreMessages]);

  return {
    messages,
    isLoadingMessages,
    isSendingMessage,
    isLoadingOlderMessages,
    hasMoreMessages,
    error,
    loadMessages,
    sendMessage,
    loadOlderMessages,
  };
}
