import ThemeToggle from "@/components/chat/theme-toggle";

function ChatHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border">
      <div>
        <h1 className="text-xl font-bold">Doodle Chat</h1>
        <p className="text-sm text-muted-foreground">Welcome to Doodle Chat!</p>
      </div>
      <ThemeToggle />
    </header>
  );
}

export default ChatHeader;
