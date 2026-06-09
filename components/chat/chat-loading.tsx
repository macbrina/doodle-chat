function ChatLoading() {
  return (
    <div
      className="mx-auto flex w-full max-w-180 flex-col gap-4 px-4 py-6 lg:max-w-190"
      aria-label="Loading messages"
    >
      <SkeletonBubble />
      <SkeletonBubble className="ml-auto w-full max-w-130 bg-outgoing-message/70" />
      <SkeletonBubble className="w-75" />
    </div>
  );
}

function SkeletonBubble({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full max-w-90 animate-pulse rounded-md border border-border bg-surface/90 p-4 shadow-sm ${className}`}
    >
      <div className="mb-3 h-4 w-24 rounded bg-muted" />
      <div className="mb-2 h-5 w-full rounded bg-muted" />
      <div className="mb-4 h-5 w-3/4 rounded bg-muted" />
      <div className="h-4 w-32 rounded bg-muted" />
    </div>
  );
}

export default ChatLoading;
