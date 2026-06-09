"use client";

import ChatEmptyState from "@/components/chat/chat-empty-state";
import MessageBubble from "@/components/chat/message-bubble";
import type { MessageListProps } from "@/types/messages";

function MessageList({
  messages,
  isLoadingOlderMessages,
  hasMoreMessages,
  loadOlderError,
}: MessageListProps) {
  if (messages.length === 0) {
    return <ChatEmptyState />;
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-180 flex-col gap-4 px-4 py-6 lg:max-w-190">
      {loadOlderError ? (
        <div className="rounded-md border border-border bg-surface/90 px-4 py-3 text-center text-sm text-muted-foreground">
          {loadOlderError}
        </div>
      ) : null}
      {isLoadingOlderMessages ? (
        <p className="text-center text-sm text-muted-foreground">
          Loading older messages...
        </p>
      ) : null}
      {!hasMoreMessages ? (
        <p className="text-center text-sm text-muted-foreground">
          No more messages to load
        </p>
      ) : null}

      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          isOwnMessage={message.author.toLowerCase() === "you"}
        />
      ))}
    </div>
  );
}
export default MessageList;
