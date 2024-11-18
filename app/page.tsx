"use client";

import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "@/components/chat-header";
import { ChatInput } from "@/components/chat-input";
import { ChatMessage } from "@/components/chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: number;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    isBot: true,
    timestamp: Date.now(),
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const simulateBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const botResponses = [
      "That's an interesting point! Let me think about it...",
      "I understand what you're saying. Here's my perspective...",
      "Thanks for sharing! I'd love to explore that further...",
      "That's a great question! Here's what I think...",
    ];
    
    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: randomResponse,
        isBot: true,
        timestamp: Date.now(),
      },
    ]);
    setIsTyping(false);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    simulateBotResponse(content);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col">
      <ChatHeader />
      <div className="flex-1 container max-w-4xl mx-auto flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}
            {isTyping && (
              <div className="flex gap-2 p-4">
                <div className="animate-pulse flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </main>
  );
}