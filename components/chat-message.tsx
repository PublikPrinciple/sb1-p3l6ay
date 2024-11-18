"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ChatMessageProps {
  content: string;
  isBot: boolean;
  timestamp: number;
}

export function ChatMessage({ content, isBot, timestamp }: ChatMessageProps) {
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    // Format time only on client-side
    setFormattedTime(new Date(timestamp).toLocaleTimeString());
  }, [timestamp]);

  return (
    <div className={cn("flex w-full gap-4 p-4", !isBot && "flex-row-reverse")}>
      <Avatar>
        <AvatarImage src={isBot ? "/bot-avatar.png" : "/user-avatar.png"} />
        <AvatarFallback>{isBot ? "BOT" : "YOU"}</AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col gap-1", !isBot && "items-end")}>
        <div
          className={cn(
            "rounded-lg px-4 py-2 max-w-[80%]",
            isBot ? "bg-secondary" : "bg-primary text-primary-foreground"
          )}
        >
          {content}
        </div>
        <span className="text-xs text-muted-foreground" suppressHydrationWarning>
          {formattedTime}
        </span>
      </div>
    </div>
  );
}