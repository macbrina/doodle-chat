"use client";

import { useEffect, useRef } from "react";
import { useChatMessages } from "@/hooks/use-chat-messages";
import ChatError from "@/components/chat/chat-error";
import ChatHeader from "@/components/chat/chat-header";
import ChatLoading from "@/components/chat/chat-loading";
import MessageComposer from "@/components/chat/message-composer";
import MessageList from "@/components/chat/message-list";

function ChatShell() {
  const scrollContainerRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return (
    <main className="flex h-dvh flex-col bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <ChatHeader />

      <section
        className="flex-1 overflow-y-auto bg-background bg-[url('/background.png')] bg-repeat"
        ref={scrollContainerRef}
        onScroll={(event) => {
          if (event.currentTarget.scrollTop < 80 && !isLoadingOlderMessages) {
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
        onSendMessage={sendMessage}
        sendError={sendError}
      />
    </main>
  );
}

export default ChatShell;
