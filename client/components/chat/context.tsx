"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { ChatMessage, Conversation, Counselor, getCounselors as getCounselorsApi } from "@/lib/api";
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
  counselors: Counselor[];
  setCounselors: React.Dispatch<React.SetStateAction<Counselor[]>>;
  fetchConversations: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  sendMessage: (receiverId: string, message: string) => Promise<ChatMessage | null>;
  fetchCounselors: () => Promise<void>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [counselors, setCounselors] = useState<Counselor[]>([]);

  // Fetch conversations for the current user
  const fetchConversations = useCallback(async () => {
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

  // Function to fetch counselors - **Wrapped in useCallback**
  const fetchCounselors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCounselorsApi();
      if (data) {
        setCounselors(data);
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Dependency array is empty as it doesn't rely on outside props/state.

  // Load conversations and counselors on initial load
  useEffect(() => {
    const loadData = async () => {
      // setLoading(true) is already handled by individual fetch functions, but this handles the collective loading state.
      // We can simplify this a bit since the individual functions already set loading.
      // Let's keep it simple and rely on the individual fetch loading states for the API calls.
      try {
        await Promise.all([
          fetchConversations(),
          fetchCounselors()
        ]);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };
    
    loadData();
    // fetchConversations and fetchCounselors are now memoized with useCallback, 
    // so they are stable and won't trigger the useEffect on every render.
  }, [fetchConversations, fetchCounselors]); 

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
    loading,
    counselors,
    setCounselors,
    fetchConversations,
    fetchMessages,
    sendMessage,
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