"use client";

import { useChat } from "@/components/chat/context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function ConversationList() {
  const { conversations, loading } = useChat();
  const router = useRouter();

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex space-x-1 mb-4">
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
          <p className="text-slate-400">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-white/10 p-4 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-1">No conversations yet</h3>
        <p className="text-slate-400 max-w-xs">
          You haven't started any conversations with counselors yet. Start by finding a counselor.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10">
      {conversations.map((conversation) => (
        <div
          key={conversation.otherUser._id}
          className={cn(
            "flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-white/10"
          )}
          onClick={() => router.push(`/chat/${conversation.otherUser._id}`)}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.otherUser.name}`}
              alt={conversation.otherUser.name}
            />
            <AvatarFallback>
              {conversation.otherUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium truncate">
                {conversation.otherUser.name}
              </p>
              <span className="text-xs text-slate-400">
                {new Date(conversation.lastMessageAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate mt-1">
              {conversation.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}