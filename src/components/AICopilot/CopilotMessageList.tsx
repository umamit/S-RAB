"use client";
import React from "react";
import { Bot, User } from "lucide-react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface CopilotMessageListProps {
  messages: ChatMessage[];
  loading: boolean;
}

export default function CopilotMessageList({ messages, loading }: CopilotMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {m.role === "assistant" && (
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
              <Bot className="w-3.5 h-3.5" />
            </div>
          )}

          <div
            className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed space-y-1.5 shadow-2xs whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium"
                : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
            }`}
          >
            {m.content}
          </div>

          {m.role === "user" && (
            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
              <User className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="flex gap-2.5 justify-start">
          <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 text-zinc-500 italic text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Copilot sedang menganalisis data proyek...</span>
          </div>
        </div>
      )}
    </div>
  );
}
