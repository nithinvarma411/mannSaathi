"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { ChatMessage, Conversation, Counselor, getCounselors as getCounselorsApi, sendAIMessage as sendAIMessageApi, SendAIMessageRequest, getAIMessages } from "@/lib/api";
import { getConversations, getMessages, sendMessage as sendApiMessage } from "@/lib/api";
import { toast } from "sonner";

type ChatContextType = {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  activeConversation: Conversation | null;
  setActiveConversation: React.Dispatch<React.SetStateAction<Conversation | null>>;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  aiMessages: ChatMessage[];
  setAiMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  loading: boolean;
  aiLoading: boolean;
  counselors: Counselor[];
  setCounselors: React.Dispatch<React.SetStateAction<Counselor[]>>;
  fetchConversations: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  fetchAIMessages: () => Promise<void>;
  sendMessage: (receiverId: string, message: string) => Promise<ChatMessage | null>;
  sendAIMessage: (message: string, context?: string) => Promise<{ message: string } | null>;
  fetchCounselors: () => Promise<void>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [counselors, setCounselors] = useState<Counselor[]>([]);

  // Fetch conversations for the current user
  const fetchConversations = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, skipping conversation fetch");
      return;
    }
    
    setLoading(true);
    try {
      const data = await getConversations();
      if (data && Array.isArray(data)) {
        setConversations(data);
      } else if (data === null) {
        // API returned null (likely auth issue or no data), set empty array
        setConversations([]);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      // Set empty conversations on error to prevent UI issues
      setConversations([]);
      // Don't show toast for conversations error as it might be normal (no conversations yet)
    } finally {
      setLoading(false);
    }
  }, []); // Dependency array is empty as it doesn't rely on outside props/state.

  // Fetch messages with a specific user
  const fetchMessages = useCallback(async (userId: string) => {
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
  }, []); // Dependency array is empty as it doesn't rely on outside props/state.

  // Function to send a message and update conversation list
  const sendMessage = async (receiverId: string, message: string): Promise<ChatMessage | null> => {
    // ... (rest of sendMessage is fine)
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

  // Fetch AI messages for the current user
  const fetchAIMessages = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, skipping AI messages fetch");
      return;
    }
    
    setAiLoading(true);
    try {
      const data = await getAIMessages();
      if (data) {
        setAiMessages(data);
      }
    } catch (error) {
      console.error("Error fetching AI messages:", error);
      // Don't show toast for AI messages error as it might be normal (no messages yet)
    } finally {
      setAiLoading(false);
    }
  }, []);

  // Function to send an AI message and update the AI messages
  const sendAIMessage = async (message: string, context?: string): Promise<{ message: string } | null> => {
    try {
      const response = await sendAIMessageApi({ message, context });
      
      if (response) {
        // Refresh AI messages to get the updated conversation including both user and AI messages
        await fetchAIMessages();
      }
      
      return response;
    } catch (error) {
      console.error("Error sending AI message:", error);
      toast.error(error instanceof Error ? error.message : "Error sending AI message");
      return null;
    }
  };

  // Function to fetch counselors - **Wrapped in useCallback**
  const fetchCounselors = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, skipping counselors fetch");
      return;
    }
    
    setLoading(true);
    try {
      const data = await getCounselorsApi();
      if (data) {
        setCounselors(data);
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
      // Don't show toast for counselors error as it might be normal
    } finally {
      setLoading(false);
    }
  }, []); // Dependency array is empty as it doesn't rely on outside props/state.

  // Load conversations, counselors, and AI messages on initial load, only if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // Only fetch data if token exists (user is authenticated)
    if (token) {
      const loadData = async () => {
        try {
          await Promise.all([
            fetchConversations(),
            fetchCounselors(),
            fetchAIMessages()
          ]);
        } catch (error) {
          console.error("Error loading initial data:", error);
        }
      };
      
      loadData();
    }
  }, [fetchConversations, fetchCounselors, fetchAIMessages]); 

  // If the active conversation changes, fetch messages for that user
  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.otherUser._id);
    }
  }, [activeConversation, fetchMessages]);

  const value = {
    conversations,
    setConversations,
    activeConversation,
    setActiveConversation,
    messages,
    setMessages,
    aiMessages,
    setAiMessages,
    loading,
    aiLoading,
    counselors,
    setCounselors,
    fetchConversations,
    fetchMessages,
    fetchAIMessages,
    sendMessage,
    sendAIMessage,
    fetchCounselors,
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