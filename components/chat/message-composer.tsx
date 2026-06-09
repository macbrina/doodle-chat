"use client";

import { FormEvent, useState } from "react";

import { CHAT_RULES } from "@/lib/utils/validation";
import type { MessageComposerProps } from "@/types/messages";

const AUTHOR_NAME = "You";

function MessageComposer({
  isSending,
  sendError,
  onSendMessage,
}: MessageComposerProps) {
  const [message, setMessage] = useState("");

  const trimmedMessage = message.trim();
  const isMessageEmpty = trimmedMessage.length === 0;
  const isMessageTooLong = trimmedMessage.length > CHAT_RULES.message.maxLength;

  const canSend = !isSending && !isMessageEmpty && !isMessageTooLong;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSend) return;

    const wasSent = await onSendMessage({
      author: AUTHOR_NAME,
      message: trimmedMessage,
    });

    if (wasSent) {
      setMessage("");
    }
  };

  return (
    <footer className="border-t border-border bg-composer-bg p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-190 gap-4"
      >
        <label htmlFor="message" className="sr-only">
          Message
        </label>

        <input
          id="message"
          name="message"
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message"
          maxLength={CHAT_RULES.message.maxLength}
          disabled={isSending}
          className="min-h-14 flex-1 rounded-md border border-border bg-composer-input px-4 text-lg text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={!canSend}
          className="min-h-14 rounded-md bg-composer-button px-8 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? "Sending..." : sendError ? "Retry" : "Send"}
        </button>
      </form>

      {isMessageTooLong ? (
        <p className="mx-auto mt-2 w-full max-w-190 text-sm text-white">
          Message cannot exceed {CHAT_RULES.message.maxLength} characters.
        </p>
      ) : null}

      {sendError ? (
        <p className="mx-auto mt-2 w-full max-w-190 text-sm font-medium text-white">
          {sendError}. Your message was not sent. Edit it or press Retry.
        </p>
      ) : null}
    </footer>
  );
}

export default MessageComposer;
