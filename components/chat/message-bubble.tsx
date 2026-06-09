import { formatDate } from "@/lib/utils/format-date";
import type { MessageBubbleProps } from "@/types/messages";

function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  const createdAt = formatDate(message.createdAt);

  return (
    <article
      className={[
        "rounded-md border border-border p-4 shadow-sm",
        isOwnMessage
          ? "ml-auto w-full max-w-130 bg-outgoing-message"
          : "w-fit max-w-[320px] bg-incoming-message",
      ].join(" ")}
    >
      <p className="mb-1 text-sm font-medium text-muted-foreground">
        {isOwnMessage ? "You" : message.author}
      </p>

      <p className="whitespace-pre-wrap wrap-break-word text-lg leading-relaxed text-surface-foreground">
        {message.message}
      </p>

      <time
        dateTime={message.createdAt}
        className="mt-2 block text-sm text-muted-foreground"
      >
        {createdAt}
      </time>
    </article>
  );
}

export default MessageBubble;
