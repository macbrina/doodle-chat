"use client";

import ChatError from "@/components/chat/chat-error";
import ChatHeader from "@/components/chat/chat-header";
import ChatLoading from "@/components/chat/chat-loading";
import MessageComposer from "@/components/chat/message-composer";
import MessageList from "@/components/chat/message-list";
import { useChatMessages } from "@/hooks/use-chat-messages";
import type { CreateMessageRequest } from "@/types/messages";
import { useCallback, useEffect, useRef } from "react";

function ChatShell() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const hasInitialScrolledRef = useRef(false);

  const {
    messages,
    isLoadingMessages,
    isSendingMessage,
    isLoadingOlderMessages,
    hasMoreMessages,
    loadError,
    loadOlderError,
    sendError,
    loadMessages,
    loadOlderMessages,
    sendMessage,
  } = useChatMessages();

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight - container.clientHeight,
        behavior,
      });
    });
  }, []);

  const handleSendMessage = async (payload: CreateMessageRequest) => {
    const wasSent = await sendMessage(payload);

    if (wasSent) {
      scrollToBottom("smooth");
    }

    return wasSent;
  };

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (
      !hasInitialScrolledRef.current &&
      !isLoadingMessages &&
      messages.length > 0
    ) {
      hasInitialScrolledRef.current = true;
      scrollToBottom("smooth");
    }
  }, [isLoadingMessages, messages.length, scrollToBottom]);

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <ChatHeader />

      <section
        ref={scrollContainerRef}
        className="
          flex-1 overflow-y-auto bg-background bg-[url('/background.png')] bg-repeat 
          dark:bg-[url('/dark-background.png')]
        "
        onScroll={(event) => {
          if (
            event.currentTarget.scrollTop < 80 &&
            !isLoadingOlderMessages &&
            hasMoreMessages
          ) {
            loadOlderMessages();
          }
        }}
      >
        {isLoadingMessages ? (
          <ChatLoading />
        ) : loadError ? (
          <ChatError message={loadError} onRetry={loadMessages} />
        ) : (
          <MessageList
            messages={messages}
            hasMoreMessages={hasMoreMessages}
            isLoadingOlderMessages={isLoadingOlderMessages}
            onLoadOlderMessages={loadOlderMessages}
            loadOlderError={loadOlderError}
          />
        )}
      </section>

      <MessageComposer
        isSending={isSendingMessage}
        onSendMessage={handleSendMessage}
        sendError={sendError}
      />
    </main>
  );
}

export default ChatShell;
