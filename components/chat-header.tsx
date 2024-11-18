import { Bot, Settings } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6" />
        <h1 className="text-xl font-semibold">AI Chatbot Playground</h1>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </div>
  );
}