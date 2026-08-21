"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Trash2 } from "lucide-react";
import { useRABStore } from "@/lib/store";
import { buildProjectSummaryPayload } from "@/lib/ai/rabAuditService";
import CopilotMessageList, { type ChatMessage } from "./CopilotMessageList";
import CopilotQuickPrompts from "./CopilotQuickPrompts";

export default function AICopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: "Halo! Saya **AI Estimator Copilot** Anda. Saya siap membantu menghitung kebutuhan bahan, menganalisis struktur biaya, atau membuat draf dokumen resmi untuk proyek ini. Ada yang bisa saya bantu?",
    },
  ]);

  const projects = useRABStore((s) => s.projects);
  const activeProjectId = useRABStore((s) => s.activeProjectId);
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading || !activeProject) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const projectContext = buildProjectSummaryPayload(activeProject);
      const res = await fetch("/api/ai/chat-copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          projectContext,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menghubungi AI Copilot.");
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.content || "Tidak ada jawaban.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `⚠️ Terjadi kesalahan: ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-2xl shadow-xl flex items-center gap-2.5 transition-all hover:scale-105 border border-zinc-200 dark:border-zinc-800"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <Bot className="w-4 h-4 text-emerald-400" />
          <span className="text-xs tracking-tight">AI Copilot</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-[380px] sm:w-[440px] h-[580px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="p-3.5 bg-zinc-900 text-white dark:bg-zinc-900 border-b border-zinc-800 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs">AI Estimator Copilot</h4>
                <p className="text-[10px] text-zinc-400 truncate max-w-[200px]">{activeProject?.name || "Proyek Aktif"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([messages[0]])}
                title="Bersihkan Percakapan"
                className="p-1 text-zinc-400 hover:text-zinc-200 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-200 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <CopilotMessageList messages={messages} loading={loading} />
          <CopilotQuickPrompts onSelectPrompt={(p) => handleSendMessage(p)} disabled={loading} />

          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 items-center bg-white dark:bg-zinc-950 shrink-0"
          >
            <input
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan apapun seputar proyek ini..."
              className="flex-1 px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
            <button
              type="submit" disabled={!input.trim() || loading}
              className="p-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-xl transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
