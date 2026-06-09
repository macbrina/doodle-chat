function ChatEmptyState() {
  return (
    <div className="flex h-full items-center justify-center px-4 text-center">
      <div className="max-w-sm rounded-md border border-border bg-surface/90 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          No messages yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start the conversation by sending the first message.
        </p>
      </div>
    </div>
  );
}

export default ChatEmptyState;
