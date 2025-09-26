import { toast } from "sonner";

// Base API URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface SendMessageRequest {
  receiverId: string;
  message: string;
}

export interface ChatMessage {
  _id: string;
  senderId: {
    _id: string;
    name: string;
    role: string;
  };
  receiverId: {
    _id: string;
    name: string;
    role: string;
  };
  message: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  otherUser: {
    _id: string;
    name: string;
    role: string;
  };
  lastMessage: string;
  lastMessageAt: string;
}

export interface Counselor {
  _id: string;
  name: string;
  role: string;
  avgRating?: number;
  ratingCount?: number;
}

// Function to get headers including authentication
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // If there's an authentication token in localStorage, include it
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Function to send a message
export async function sendMessage(data: SendMessageRequest): Promise<ChatMessage | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/send-message`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send message");
    }

    // Don't show toast here since it's handled by the context
    return result.data;
  } catch (error) {
    console.error("Error sending message:", error);
    toast.error(error instanceof Error ? error.message : "Error sending message");
    return null;
  }
}

// Function to get messages with a specific user
export async function getMessages(userId: string): Promise<ChatMessage[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/messages/${userId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch messages");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    toast.error(error instanceof Error ? error.message : "Error fetching messages");
    return null;
  }
}

// Function to get all conversations for current user
export async function getConversations(): Promise<Conversation[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/conversations`, {
      method: "GET",
      headers: getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle common HTTP errors gracefully
      if (response.status === 401) {
        console.warn("User not authenticated for conversations");
        return null;
      }
      if (response.status === 404) {
        console.warn("No conversations found for user");
        return [];
      }
      
      // For other errors, log but don't throw
      console.error("Error fetching conversations:", result.error || "Unknown error");
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Network error fetching conversations:", error);
    // Only show toast for actual network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      toast.error("Network error while fetching conversations");
    }
    return null;
  }
}

// Function to get all counselors
export async function getCounselors(): Promise<Counselor[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/counselors`, {
      method: "GET",
      headers: getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch counselors");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching counselors:", error);
    // Only show toast for network errors, not empty results
    if (error instanceof TypeError && error.message.includes('fetch')) {
      toast.error("Network error while fetching counselors");
    }
    return null;
  }
}

// Function to send a message to the AI chatbot
export interface SendAIMessageRequest {
  message: string;
  context?: string;
}

export interface AIBotResponse {
  message: string;
}

export async function sendAIMessage(data: SendAIMessageRequest): Promise<AIBotResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to get AI response");
    }

    return result.data;
  } catch (error) {
    console.error("Error getting AI response:", error);
    toast.error(error instanceof Error ? error.message : "Error getting AI response");
    return null;
  }
}

// Function to get AI chat history for the current user
export async function getAIMessages(): Promise<ChatMessage[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/messages/000000000000000000000000`, {
      method: "GET",
      headers: getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch AI chat history");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching AI chat history:", error);
    // Only show toast for network errors, not empty results
    if (error instanceof TypeError && error.message.includes('fetch')) {
      toast.error("Network error while fetching AI chat history");
    }
    return null;
  }
}