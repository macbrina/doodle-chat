import { ChatErrorProps } from "@/types/messages";

function ChatError({
  title = "Something went wrong",
  message,
  onRetry,
}: ChatErrorProps) {
  return (
    <div className="flex h-full items-center justify-center px-4 text-center">
      <div className="max-w-sm rounded-md border border-border bg-surface/90 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>

        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-md bg-composer-button px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Try again
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ChatError;
