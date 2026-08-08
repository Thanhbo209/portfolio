"use client";

import { useEffect, useRef } from "react";

import { MessageBubble, type ChatMessage } from "@/components/sections/overview/MessageBubble";
import { TypingIndicator } from "@/components/sections/overview/TypingIndicator";
import { SuggestionChips } from "@/components/sections/overview/SuggestionChips";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  showSuggestions: boolean;
  onSelectSuggestion: (topicId: string) => void;
}

export function ChatMessageList({
  messages,
  isTyping,
  showSuggestions,
  onSelectSuggestion,
}: ChatMessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll only this container's own scrollTop, not
    // `element.scrollIntoView()` - that walks every scrollable ancestor
    // including the window, so a new message would drag the whole page's
    // scroll position along with it.
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div
      ref={containerRef}
      role="log"
      aria-live="polite"
      aria-label="Conversation with Thanh's portfolio assistant"
      // flex-1 fills whatever height the card ends up with. On desktop
      // that height is explicitly fixed by DashboardGrid (measured from
      // GitHub Activity + gap + Quick Facts), so a long conversation
      // scrolls in place instead of growing the card. On mobile there's no
      // fixed height to inherit, so min-h/max-h keep it from collapsing or
      // growing unbounded. Suggestion chips render inside this same scroll
      // region (not as a sibling of it) so they don't change the card's
      // height when they disappear.
      className="flex min-h-64 max-h-112 flex-1 flex-col gap-3 overflow-y-auto sm:max-h-none sm:min-h-0"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
      {showSuggestions && <SuggestionChips onSelect={onSelectSuggestion} />}
    </div>
  );
}
