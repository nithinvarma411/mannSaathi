"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TopNav } from "@/components/nav/top-nav";
import { Send } from "lucide-react";
import { ProfileIcon } from "@/components/profile/icon";
import { getMessages } from "@/lib/api";
import { useChat } from "@/components/chat/context";

interface ChatSenderId {
  _id: string;
  name: string;
  role: string;
}

interface ChatReceiverId {
  _id: string;
  name: string;
  role: string;
}

interface ChatMessage {
  _id: string;
  senderId: ChatSenderId;
  receiverId: ChatReceiverId;
  message: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

export default function ChatWithCounselor() {
  const { id } = useParams();
  const router = useRouter();
  const { messages, setMessages, loading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch messages when component mounts or id changes
  useEffect(() => {
    if (id) {
      const fetchMessages = async () => {
        setIsLoading(true);
        try {
          const fetchedMessages = await getMessages(id as string);
          if (fetchedMessages) {
            setMessages(fetchedMessages);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
          router.push("/chat"); // Redirect to main chat page if there's an error
        } finally {
          setIsLoading(false);
        }
      };

      fetchMessages();
    }
  }, [id]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
    if (messages.length > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    
    // Add the message to the API through the context
    const result = await sendMessage(id as string, input.trim());

    if (result) {
      setInput(""); // Clear input after sending
    }

    setIsLoading(false);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-dvh bg-black text-[#E5E7EB] flex flex-col relative">
      <TopNav />
      
      {/* Profile Icon and Language Selector */}
      <div className="hidden lg:flex absolute right-5 top-5 items-center gap-3">
        {/* Language selector can be added here if needed */}
        <ProfileIcon />
      </div>

      {/* Chat Header */}
      <div className="border-b border-white/10 p-4">
        <h1 className="text-xl font-semibold">Chat with Counselor</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.senderId._id === localStorage.getItem("userId")
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.senderId._id === localStorage.getItem("userId")
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-slate-200 border border-white/10"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      msg.senderId._id === localStorage.getItem("userId")
                        ? "text-blue-200"
                        : "text-slate-400"
                    }`}
                  >
                    {formatDate(msg.createdAt)}
                  </span>
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
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4 backdrop-blur-sm">
        <form
          onSubmit={handleSendMessage}
          className="relative flex items-center gap-3 p-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-slate-200 placeholder-slate-400 outline-none text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-blue-800 text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}