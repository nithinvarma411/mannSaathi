"use client";

import { useEffect, useRef, useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { Send, Sparkle, Zap } from "lucide-react";
import { ProfileIcon } from "@/components/profile/icon";
import { useLanguage } from "@/components/ui/language-context";
import LanguageSelector from "@/components/ui/language-selector";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time?: string;
};

type Counselor = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastSeen: string;
};

const COUNSELOR_HISTORY: Counselor[] = [
  {
    id: "c1",
    name: "chat_counselor_maya",
    avatar: "/counselor-avatar.png",
    lastMessage: "chat_maya_message",
    lastSeen: "chat_time_2h",
  },
  {
    id: "c2",
    name: "chat_counselor_alex",
    avatar: "/counselor-avatar.png",
    lastMessage: "chat_alex_message",
    lastSeen: "chat_time_yesterday",
  },
  {
    id: "c3",
    name: "chat_counselor_priya",
    avatar: "/counselor-avatar.png",
    lastMessage: "chat_priya_message",
    lastSeen: "chat_time_monday",
  },
];

const SUGGESTED_PROMPTS = [
  "chat_prompt_anxious",
  "chat_prompt_sleep",
  "chat_prompt_coping",
  "chat_prompt_stress",
];

function HistoryList({
  items,
  onCounselorSelect,
}: {
  items: Counselor[];
  onCounselorSelect: (counselor: Counselor) => void;
}) {
  const { t } = useLanguage()
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          {t("your_counselors")}
        </h2>
        <ul className="flex flex-col divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
          {items.map((c) => (
            <li
              key={c.id}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-white/10 cursor-pointer"
              onClick={() => onCounselorSelect(c)}
              role="button"
              aria-label={`Open chat with ${c.name}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onCounselorSelect(c);
              }}
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10">
                <img
                  src={
                    c.avatar ||
                    "/placeholder.svg?height=48&width=48&query=counselor avatar"
                  }
                  alt={`${c.name} avatar`}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-base font-medium text-white">
                    {t(c.name)}
                  </p>
                  <span className="text-sm text-slate-400">{t(c.lastSeen)}</span>
                </div>
                <p className="truncate text-sm text-slate-400">
                  {t(c.lastMessage)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CenterInput({
  value,
  onChange,
  onSubmit,
  onSuggestionClick,
  inputRef,
  disabled,
  t,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onSuggestionClick: (s: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  t: (key: string) => string;
}) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-3 justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-300" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-2">
            {t('chat_how_can_i_help')}
          </h1>
          <p className="text-slate-400 mb-6">
            {t('chat_type_message_instruction')}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="mb-6"
        >
          <div className="relative flex items-center gap-3 p-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm transition-all">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Ask Anything"
              className="flex-1 bg-transparent text-slate-200 placeholder-slate-400 outline-none text-base"
              disabled={disabled}
              autoFocus
            />
            <button
              type="submit"
              disabled={!value.trim() || disabled}
              className="p-2 rounded-xl bg-gradient-to-r from-[#460075] to-[#0955b2] text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Send message"
            >
              <Sparkle />
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => onSuggestionClick(t(p))}
              className="p-3 text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-slate-300 hover:text-slate-200"
            >
              {t(p)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([]);
  const [view, setView] = useState<"ai" | "history">("ai");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCounselor, setActiveCounselor] = useState<Counselor | null>(
    null,
  );

  const bottomInputRef = useRef<HTMLInputElement | null>(null);
  const centerInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // when messages appear, focus bottom input
    if (messages.length > 0) {
      bottomInputRef.current?.focus();
    }
  }, [messages]);

  useEffect(() => {
    // if no messages, focus center input
    if (messages.length === 0) {
      centerInputRef.current?.focus();
    }
  }, [messages.length]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: text.trim(),
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(
      () => {
        let responseText =
          "Thank you for sharing. I'm here to help you work through this.";

        if (
          text.toLowerCase().includes("anxious") ||
          text.toLowerCase().includes("anxiety")
        ) {
          responseText =
            "I understand you're feeling anxious. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 4, then exhale for 6. Would you like me to guide you through some coping strategies?";
        } else if (text.toLowerCase().includes("sleep")) {
          responseText =
            "Sleep issues can be really challenging. A consistent bedtime routine can help. What does your current evening routine look like?";
        } else if (text.toLowerCase().includes("stress")) {
          responseText =
            "Stress affects us all differently. What are the main sources of stress in your life right now? Understanding them is the first step to managing them better.";
        } else if (text.toLowerCase().includes("coping")) {
          responseText =
            "Coping strategies are personal and what works varies for everyone. Some effective techniques include deep breathing, grounding exercises, journaling, and progressive muscle relaxation. Which of these sounds most appealing to you?";
        }

        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          text: responseText,
          time,
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleSubmitCenter = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleSubmitBottom = (e: React.FormEvent) => {
    e.preventDefault();
    const value = bottomInputRef.current?.value || "";
    handleSend(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // when suggestion clicked, if no messages exist, we want input to go to bottom after sending
    handleSend(suggestion);
  };

  const handleSelectCounselor = (counselor: Counselor) => {
    setView("ai");
    setActiveCounselor(counselor);
    const welcomeMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: `Hi! This is ${counselor.name}. I'm glad you reached out. How are you feeling today?`,
      time: "Now",
    };
    setMessages([welcomeMsg]);
  };

  return (
    <div className="min-h-dvh bg-black text-[#E5E7EB] flex flex-col relative">
      <TopNav />

      {/* Profile Icon and Language Selector */}
      <div className="hidden lg:flex absolute right-5 top-5 items-center gap-3">
        <LanguageSelector />
        <ProfileIcon />
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center pt-4 pb-2 mt-20 relative z-10">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setView("ai")}
            className={[
              "rounded-full px-6 py-2 text-sm font-medium transition-all duration-200",
              view === "ai"
                ? "bg-gradient-to-r from-[#22D3EE]/20 to-[#60A5FA]/20 text-slate-50 shadow-lg"
                : "text-slate-300 hover:text-slate-200",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-300" />
              <span>{t("ai_chat")}</span>
            </div>
          </button>
          <button
            onClick={() => setView("history")}
            className={[
              "rounded-full px-6 py-2 text-sm font-medium transition-all duration-200",
              view === "history"
                ? "bg-gradient-to-r from-[#22D3EE]/20 to-[#60A5FA]/20 text-slate-50 shadow-lg"
                : "text-slate-300 hover:text-slate-200",
            ].join(" ")}
          >
            {t("counselor_history")}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative z-10">
        {view === "history" ? (
          <HistoryList
            items={COUNSELOR_HISTORY}
            onCounselorSelect={handleSelectCounselor}
          />
        ) : (
          <>
            {/* If there are no messages show center input and welcome */}
            {messages.length === 0 ? (
              <CenterInput
                value={input}
                onChange={(v) => setInput(v)}
                onSubmit={() => handleSend(input)}
                onSuggestionClick={handleSuggestionClick}
                inputRef={centerInputRef}
                disabled={isLoading}
                t={t}
              />
            ) : (
              // Messages list with bottom input
              <div className="flex-1 flex flex-col">
                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto px-4 py-6"
                >
                  <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            msg.role === "user"
                              ? "bg-slate-700 text-white"
                              : "bg-white/10 text-slate-200 border border-white/10"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.text}
                          </p>
                          {msg.time && (
                            <span
                              className={`text-xs mt-2 block ${
                                msg.role === "user"
                                  ? "text-white/70"
                                  : "text-slate-400"
                              }`}
                            >
                              {msg.time}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 text-slate-200 border border-white/10 rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Bottom Input - moves here after first message */}
                <div className=" backdrop-blur-sm px-5">
                  <div className="max-w-3xl mx-auto py-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const val = bottomInputRef.current?.value || "";
                        handleSend(val);
                      }}
                    >
                      <div className="relative flex items-center gap-3 p-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm focus-within:border-white/30 transition-colors">
                        <input
                          ref={bottomInputRef}
                          defaultValue={""}
                          placeholder="Ask Anything"
                          className="flex-1 bg-transparent text-slate-200 text-sm placeholder-slate-400 outline-none"
                          disabled={isLoading}
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="p-2 rounded-xl bg-blue-800 text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                          aria-label="Send message"
                        >
                          <Send size={18} />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
