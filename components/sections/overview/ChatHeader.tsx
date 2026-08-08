import { ChatCircleIcon } from "@phosphor-icons/react/dist/ssr";

export function ChatHeader() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
        <ChatCircleIcon className="size-4" weight="regular" />
      </span>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-foreground">Ask My Portfolio</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          <span>AI Assistant</span>
        </div>
      </div>
    </div>
  );
}
