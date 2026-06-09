"use client";

import { useCallback, useState } from "react";
import {
  fetchMessages,
  sendMessage as sendMessageRequest,
} from "@/lib/api/messages";
import { CHAT_RULES } from "@/lib/utils/validation";
import type {
  FetchMessagesQuery,
  Message,
  CreateMessageRequest,
} from "@/types/messages";
import { getErrorMessage } from "@/lib/utils/helper";

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [loadOlderError, setLoadOlderError] = useState<string | null>(null);

  const loadMessages = useCallback(
    async (
      options: FetchMessagesQuery = { limit: CHAT_RULES.message.defaultLimit },
    ) => {
      try {
        setIsLoadingMessages(true);
        setLoadError(null);

        const messages = await fetchMessages(options);

        setMessages(messages);
      } catch (error) {
        const errorMessage = getErrorMessage(error, "Failed to load messages");
        setLoadError(errorMessage);
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [],
  );

  const sendMessage = useCallback(
    async (content: CreateMessageRequest): Promise<boolean> => {
      try {
        setIsSendingMessage(true);
        setSendError(null);

        const newMessage = await sendMessageRequest(content);

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        return true;
      } catch (error) {
        const errorMessage = getErrorMessage(error, "Failed to send messages");

        setSendError(errorMessage);

        return false;
      } finally {
        setIsSendingMessage(false);
      }
    },
    [],
  );

  const loadOlderMessages = useCallback(async () => {
    const oldestMessage = messages[0];

    if (!oldestMessage || isLoadingOlderMessages || !hasMoreMessages) return;

    try {
      setIsLoadingOlderMessages(true);
      setLoadOlderError(null);

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
      const errorMessage = getErrorMessage(
        error,
        "Failed to load older messages",
      );

      setLoadOlderError(errorMessage);
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
    loadError,
    sendError,
    loadOlderError,
    loadMessages,
    sendMessage,
    loadOlderMessages,
  };
}
