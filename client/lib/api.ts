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
      throw new Error(result.error || "Failed to fetch conversations");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    toast.error(error instanceof Error ? error.message : "Error fetching conversations");
    return null;
  }
}