"use client";

import { useState } from "react";
import { ChatCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";
import { SuggestionChips } from "@/components/sections/overview/SuggestionChips";
import { AssistantMessage } from "@/components/sections/overview/AssistantMessage";
import { AssistantInput } from "@/components/sections/overview/AssistantInput";
import {
  findResponse,
  getTopicById,
  type AssistantTopic,
} from "@/lib/portfolio-assistant";

export function AskMeCard() {
  const [activeTopic, setActiveTopic] = useState<AssistantTopic | null>(null);
  const [inputValue, setInputValue] = useState("");

  function askTopic(topicId: string) {
    setActiveTopic(getTopicById(topicId) ?? null);
    setInputValue("");
  }

  function askQuery(query: string) {
    if (!query.trim()) return;
    setActiveTopic(findResponse(query));
    setInputValue("");
  }

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <ChatCircleIcon className="size-4" weight="regular" />
        <span>Ask My Portfolio</span>
      </div>

      <p className="text-xs text-muted-foreground">
        A lightweight, AI-inspired assistant that answers questions about my
        projects, experience, and skills.
      </p>

      <SuggestionChips onSelect={askTopic} />

      <AssistantMessage activeTopic={activeTopic} />

      <AssistantInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={() => askQuery(inputValue)}
      />
    </Card>
  );
}
