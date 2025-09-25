import { Types } from "mongoose";
import { ChatMessage, ChatMessageDoc } from "../models/ChatMessage";
import { User } from "../models/User";

// Generate a conversation ID from two user IDs (sorted to ensure consistency)
function generateConversationId(user1Id: string | Types.ObjectId, user2Id: string | Types.ObjectId): string {
  const id1 = user1Id.toString();
  const id2 = user2Id.toString();
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}_${sortedIds[1]}`;
}

// Send a new message
export async function sendMessage(
  senderId: string | Types.ObjectId,
  receiverId: string | Types.ObjectId,
  message: string
): Promise<{ ok: boolean; message?: string; data?: ChatMessageDoc }> {
  try {
    // Verify both users exist
    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId)
    ]);

    if (!sender || !receiver) {
      return { ok: false, message: "One or both users not found" };
    }

    // Check if sender is a student/counselor and receiver is a counselor/student
    const allowedRoles = ["student", "counsellor"];
    if (!allowedRoles.includes(sender.role) || !allowedRoles.includes(receiver.role)) {
      return { ok: false, message: "Chats are allowed only between students and counselors" };
    }

    // Create the message
    const conversationId = generateConversationId(senderId, receiverId);
    const chatMessage = await ChatMessage.create({
      senderId,
      receiverId,
      message,
      conversationId
    });

    return { ok: true, data: chatMessage };
  } catch (err: any) {
    console.error(`Error in chat.service.ts -> sendMessage: ${err.message}`);
    return { ok: false, message: "Internal server error" };
  }
}

// Get messages between two users
export async function getMessages(
  userId1: string | Types.ObjectId,
  userId2: string | Types.ObjectId
): Promise<{ ok: boolean; message?: string; data?: ChatMessageDoc[] }> {
  try {
    const conversationId = generateConversationId(userId1, userId2);
    
    const messages = await ChatMessage.find({ conversationId })
      .populate([
        { path: "senderId", select: "name role" },
        { path: "receiverId", select: "name role" }
      ])
      .sort({ createdAt: 1 });

    return { ok: true, data: messages };
  } catch (err: any) {
    console.error(`Error in chat.service.ts -> getMessages: ${err.message}`);
    return { ok: false, message: "Internal server error" };
  }
}

// Get all conversations for a user
export async function getUserConversations(
  userId: string | Types.ObjectId
): Promise<{ ok: boolean; message?: string; data?: Array<{ 
  otherUser: { _id: Types.ObjectId; name: string; role: string }; 
  lastMessage: string; 
  lastMessageAt: Date; 
  unreadCount: number; 
}> }> {
  try {
    // Find all messages where the user is either sender or receiver
    const messages = await ChatMessage.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    })
    .sort({ createdAt: -1 })
    .populate([
      { path: "senderId", select: "name role" },
      { path: "receiverId", select: "name role" }
    ]);

    // Group by conversation and get the last message from each
    const conversationsMap = new Map();
    
    for (const msg of messages) {
      // Determine the other user in the conversation
      const otherUser = msg.senderId._id.toString() === userId.toString() 
        ? msg.receiverId 
        : msg.senderId;
      
      const conversationId = generateConversationId(userId, otherUser._id);
      
      // If we haven't seen this conversation yet, add it
      if (!conversationsMap.has(conversationId)) {
        conversationsMap.set(conversationId, {
          otherUser,
          lastMessage: msg.message,
          lastMessageAt: msg.createdAt
        });
      }
    }

    const conversations = Array.from(conversationsMap.values());
    
    return { ok: true, data: conversations };
  } catch (err: any) {
    console.error(`Error in chat.service.ts -> getUserConversations: ${err.message}`);
    return { ok: false, message: "Internal server error" };
  }
}