"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { TopNav } from "@/components/nav/top-nav";
import { Send, Sparkle, Zap } from "lucide-react";
import { ProfileIcon } from "@/components/profile/icon";
import { useLanguage } from "@/components/ui/language-context";
import { useChat } from "@/components/chat/context";
import LanguageSelector from "@/components/ui/language-selector";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time?: string;
};

const SUGGESTED_PROMPTS = [
  "chat_prompt_anxious",
  "chat_prompt_sleep",
  "chat_prompt_coping",
  "chat_prompt_stress",
];

export default function ChatWithCounselor() {
  const { id } = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const { conversations, messages, setMessages, loading, sendMessage, fetchMessages, fetchConversations, counselors } = useChat();
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<"ai" | "counselor">("counselor");
  const searchParams = useSearchParams();
  const [counselorName, setCounselorName] = useState<string>("Counselor");
  const bottomInputRef = useRef<HTMLInputElement | null>(null);
  const centerInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize view based on URL query parameters
  useEffect(() => {
    const viewType = searchParams.get('view');
    if (viewType === 'ai') {
      setView('ai');
    } else {
      setView('counselor'); // default to counselor view for this page
    }
  }, [searchParams]);

  // Fetch messages and counselor info when component mounts or id changes
  useEffect(() => {
    if (id) {
      fetchMessages(id as string).then(() => {
        // Convert fetched messages to the format expected by this UI
        const convertedMessages: Message[] = messages.map(msg => ({
          id: msg._id,
          role: msg.senderId._id === localStorage.getItem("userId") ? "user" : "assistant",
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }));
        setLocalMessages(convertedMessages);
      });
      
      // Find counselor name from the counselors list
      const counselor = counselors.find(c => c._id === id);
      if (counselor) {
        setCounselorName(counselor.name);
      } else {
        // If not in cache, fetch counselors
        fetchConversations().then(() => {
          const c = counselors.find(c => c._id === id);
          if (c) {
            setCounselorName(c.name);
          }
        });
      }
    }
  }, [id, fetchMessages, fetchConversations, counselors, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // when messages appear, focus bottom input
    if (localMessages.length > 0) {
      bottomInputRef.current?.focus();
    }
  }, [localMessages]);

  useEffect(() => {
    // if no messages, focus center input
    if (localMessages.length === 0) {
      centerInputRef.current?.focus();
    }
  }, [localMessages.length]);

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

    setLocalMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Send the message to the API
    const result = await sendMessage(id as string, text.trim());
    
    if (result) {
      // Add the response to the local messages
      const assistantMsg: Message = {
        id: result._id || crypto.randomUUID(),
        role: "assistant",
        text: result.message,
        time: new Date(result.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      
      setLocalMessages((prev) => [...prev, assistantMsg]);
    }

    setIsLoading(false);
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
    handleSend(suggestion);
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
            onClick={() => router.push('/chat?view=ai')}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
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
            onClick={() => setView("counselor")}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2",
              view === "counselor"
                ? "bg-gradient-to-r from-[#22D3EE]/20 to-[#60A5FA]/20 text-slate-50 shadow-lg"
                : "text-slate-300 hover:text-slate-200",
            ].join(" ")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {counselorName}
          </button>
          <button
            onClick={() => router.push('/chat?view=counselor')}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2",
              "text-slate-300 hover:text-slate-200",
            ].join(" ")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Counselors
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative z-10">
        {view === "counselor" ? (
          <>
            {/* If there are no messages show center input and welcome */}
            {localMessages.length === 0 ? (
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
                      Chat with {counselorName}
                    </h1>
                    <p className="text-slate-400 mb-6">
                      {t('chat_type_message_instruction')}
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend(input);
                    }}
                    className="mb-6"
                  >
                    <div className="relative flex items-center gap-3 p-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm transition-all">
                      <input
                        ref={centerInputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Anything"
                        className="flex-1 bg-transparent text-slate-200 placeholder-slate-400 outline-none text-base"
                        disabled={isLoading}
                        autoFocus
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
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
                        onClick={() => handleSuggestionClick(t(p))}
                        className="p-3 text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-slate-300 hover:text-slate-200"
                      >
                        {t(p)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Messages list with bottom input
              <div className="flex-1 flex flex-col">
                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto px-4 py-6"
                >
                  <div className="max-w-3xl mx-auto space-y-6">
                    {localMessages.map((msg) => (
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
                          defaultValue=""
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
        ) : (
          // AI Tab Content (same as main chat page)
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
                  handleSend(input);
                }}
                className="mb-6"
              >
                <div className="relative flex items-center gap-3 p-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm transition-all">
                  <input
                    ref={centerInputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Anything"
                    className="flex-1 bg-transparent text-slate-200 placeholder-slate-400 outline-none text-base"
                    disabled={isLoading}
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
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
                    onClick={() => handleSuggestionClick(t(p))}
                    className="p-3 text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-slate-300 hover:text-slate-200"
                  >
                    {t(p)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}