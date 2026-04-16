"use client";

import { useState, useEffect, useCallback } from "react";
import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import type { CanvasData, CanvasKind } from "@/lib/types/canvas";

export type { CanvasData, CanvasKind };

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
};

export default function WorkspacePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "How can I help you today?", timestamp: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [canvasData, setCanvasData] = useState<CanvasData | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Create workspace + primary thread on mount
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/workspaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "My workspace" }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.threadId) setThreadId(data.threadId);
        }
      } catch {
        // Workspace init failed silently — chat still works in demo mode
      }
    };
    init();
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (threadId) {
        const res = await fetch(`/api/threads/${threadId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: trimmed }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.assistantMessage) {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: data.assistantMessage.content, timestamp: Date.now() },
            ]);
            if (data.canvasCard) {
              setCanvasData(data.canvasCard as CanvasData);
            }
          }
          return;
        }
      }
      // Fallback demo response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I understand. Let me help you with that.", timestamp: Date.now() },
        ]);
      }, 600);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again.", timestamp: Date.now() },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, threadId, isLoading]);

  const triggerVisualization = useCallback((type: CanvasKind) => {
    setCanvasData({
      type,
      data: {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} View`,
        content: "Live context rendering",
      },
    });
  }, []);

  return (
    <WorkspaceLayout
      messages={messages}
      input={input}
      onInputChange={setInput}
      onSend={handleSend}
      canvasData={canvasData}
      onTriggerVisualization={triggerVisualization}
      isLoading={isLoading}
      threadId={threadId}
    />
  );
}1
