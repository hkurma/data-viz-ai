"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Bot, User } from "lucide-react";
import { ChartConfig, DataRow } from "@/types/chart";

export interface Message {
  role: "user" | "assistant";
  content: string;
  chartConfig?: ChartConfig;
}

interface ChatInterfaceProps {
  columns: string[];
  data: DataRow[];
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onChartRequested: (chartConfig: ChartConfig) => void;
}

export function ChatInterface({
  columns,
  data,
  messages,
  setMessages,
  onChartRequested,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          columns,
          dataPreview: data.slice(0, 10), // Send only first 10 rows as preview
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const result = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: result.message,
        chartConfig: result.chartConfig,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (result.chartConfig) {
        onChartRequested(result.chartConfig);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Visualization Assistant
        </CardTitle>
        <CardDescription>
          Ask me to create charts and visualizations
        </CardDescription>
      </CardHeader>

      <CardContent ref={scrollRef} className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="rounded-lg px-4 py-2 bg-muted">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2 items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a visualization... (e.g., 'Show a bar chart of sales')"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
