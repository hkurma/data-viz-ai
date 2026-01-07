"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, Sparkles } from "lucide-react";
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
          dataPreview: data.slice(0, 10),
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

  const suggestedPrompts = [
    "Show a bar chart of sales by region",
    "Create a pie chart of category distribution",
    "Line chart of trends over time",
  ];

  return (
    <div className="flex flex-col h-[600px] rounded-2xl glass overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">AI Chart Assistant</h3>
          <p className="text-xs text-muted">Describe the chart you want</p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            } animate-fade-in-up`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div
              className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                message.role === "user"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-md"
                  : "bg-surface border border-border rounded-bl-md"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
              {message.chartConfig && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <span className="text-xs opacity-80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Chart generated
                  </span>
                </div>
              )}
            </div>
            
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-muted" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start animate-fade-in-up">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-surface border border-border">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <span className="text-sm text-muted">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Suggested prompts for first message */}
        {messages.length === 1 && !isLoading && (
          <div className="pt-4">
            <p className="text-xs text-muted mb-3">Try these:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-surface border border-border hover:border-accent/50 hover:bg-surface-hover transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the chart you want..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl bg-surface border border-border text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
