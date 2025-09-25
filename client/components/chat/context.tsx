"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { ChatMessage, Conversation } from "@/lib/api";
import { getConversations, getMessages, sendMessage as sendApiMessage } from "@/lib/api";
import { toast } from "sonner";

type ChatContextType = {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  activeConversation: Conversation | null;
  setActiveConversation: React.Dispatch<React.SetStateAction<Conversation | null>>;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  loading: boolean;
  fetchConversations: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  sendMessage: (receiverId: string, message: string) => Promise<ChatMessage | null>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch conversations for the current user
  const fetchConversations = async () => {
    setLoading(true);
    try {
      const data = await getConversations();
      if (data) {
        setConversations(data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages with a specific user
  const fetchMessages = async (userId: string) => {
    setLoading(true);
    try {
      const data = await getMessages(userId);
      if (data) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to send a message and update conversation list
  const sendMessage = async (receiverId: string, message: string): Promise<ChatMessage | null> => {
    const newMessage = await sendApiMessage({ receiverId, message });
    
    if (newMessage) {
      // Update the messages state
      setMessages(prev => [...prev, newMessage]);
      
      // Update the conversation list to reflect the new message
      setConversations(prev => 
        prev.map(conv => {
          if (conv.otherUser._id === receiverId) {
            return {
              ...conv,
              lastMessage: message,
              lastMessageAt: newMessage.createdAt
            };
          }
          return conv;
        })
      );
      
      toast.success("Message sent successfully!");
    }
    
    return newMessage;
  };

  // Load conversations on initial load
  useEffect(() => {
    fetchConversations();
  }, []);

  // If the active conversation changes, fetch messages for that user
  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.otherUser._id);
    }
  }, [activeConversation]);

  const value = {
    conversations,
    setConversations,
    activeConversation,
    setActiveConversation,
    messages,
    setMessages,
    loading,
    fetchConversations,
    fetchMessages,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}