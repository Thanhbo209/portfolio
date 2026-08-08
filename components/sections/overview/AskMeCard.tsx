"use client";

import { useState } from "react";

import { Card } from "@/components/ui/Card";
import { ChatHeader } from "@/components/sections/overview/ChatHeader";
import { ChatMessageList } from "@/components/sections/overview/ChatMessageList";
import { AssistantInput } from "@/components/sections/overview/AssistantInput";
import type { ChatMessage } from "@/components/sections/overview/MessageBubble";
import {
  findResponse,
  getTopicById,
  GREETING_MESSAGE,
  SUGGESTION_CHIPS,
  type AssistantTopic,
} from "@/lib/portfolio-assistant";

// Presentational only - findResponse()/getTopicById() are still called
// synchronously and instantly. A chat with a zero-delay typing indicator
// reads as fake, so this is the one deliberate exception to "everything
// instant" elsewhere in this component.
const TYPING_DELAY_MS = 550;

let messageIdCounter = 0;
function nextMessageId(): string {
  messageIdCounter += 1;
  return `msg-${messageIdCounter}`;
}

export function AskMeCard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextMessageId(), role: "assistant", content: GREETING_MESSAGE },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function sendMessage(userText: string, topic: AssistantTopic) {
    setMessages((prev) => [
      ...prev,
      { id: nextMessageId(), role: "user", content: userText },
    ]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId(),
          role: "assistant",
          content: topic.response,
          actions: topic.actions,
        },
      ]);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  }

  function handleChipSelect(topicId: string) {
    const topic = getTopicById(topicId);
    const label = SUGGESTION_CHIPS.find((chip) => chip.topicId === topicId)?.label;
    if (!topic || !label) return;
    sendMessage(label, topic);
  }

  function handleSubmit() {
    const query = inputValue.trim();
    if (!query) return;
    sendMessage(query, findResponse(query));
  }

  return (
    <Card className="flex h-full min-h-0 flex-col gap-4">
      <ChatHeader />

      <ChatMessageList
        messages={messages}
        isTyping={isTyping}
        showSuggestions={messages.length === 1}
        onSelectSuggestion={handleChipSelect}
      />

      <AssistantInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}
