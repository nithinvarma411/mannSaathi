import Groq from "groq-sdk";
import { ChatMessage } from "../models/ChatMessage";
import { Types } from "mongoose";

// Special ID for the AI user in conversations
const AI_USER_ID = new Types.ObjectId("000000000000000000000000");

/**
 * Get a response from Groq AI chat model and save the conversation to the database
 * @param message - The user's message to the AI
 * @param userId - The ID of the user (to customize responses if needed)
 * @param context - Optional context for the AI to consider in its response
 * @returns The AI's response as a string
 */
export async function getGroqChatResponse(
  message: string,
  userId?: string,
  context?: string
): Promise<string> {
  try {
    // Check if the API key is available
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY environment variable is not set");
      throw new Error("GROQ_API_KEY environment variable is not set");
    }

    // Initialize Groq client with the API key from environment variables
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Define the system message for the mental health chatbot
    const systemMessage: Groq.Chat.ChatCompletionMessageParam = {
      role: "system",
      content: `You are Mizuki, a compassionate and professional mental health chatbot. Your purpose is to provide emotional support, coping strategies, and general mental wellness guidance to users. You should be empathetic, non-judgmental, and encouraging. You can offer information about mental health topics, suggest relaxation techniques, validate feelings, and provide helpful resources. However, you are not a substitute for professional therapy or medical advice. When appropriate, encourage users to seek help from certified professionals. If the user shares something that indicates immediate danger to themselves or others, suggest contacting emergency services or crisis helplines. Always maintain a supportive and caring tone.`
    };

    // Prepare the messages for the chat completion
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [systemMessage];

    // If there's context, add it as a user message
    if (context) {
      messages.push({
        role: "user",
        content: `Context for our conversation: ${context}

Question: ${message}`
      });
    } else {
      messages.push({
        role: "user",
        content: message
      });
    }

    // Make the API call to Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile", // Using the more capable model for conversation
      temperature: 0.7, // Slightly higher for more engaging responses
      max_tokens: 1024,
      top_p: 1,
      stream: false, // Non-streaming for simplicity
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || "I couldn't process that request. Please try again.";

    // Save both the user's message and the AI's response to the database
    if (userId) {
      // Generate a conversation ID using the same logic as in chat service
      const userObjectId = new Types.ObjectId(userId);
      const conversationId = generateConversationId(userObjectId, AI_USER_ID);
      
      // Save the user's message to the database
      await ChatMessage.create({
        senderId: userObjectId,
        receiverId: AI_USER_ID, // AI is the receiver
        message: message,
        conversationId: conversationId
      });

      // Save the AI's response to the database
      await ChatMessage.create({
        senderId: AI_USER_ID, // AI is the sender
        receiverId: userObjectId,
        message: aiResponse,
        conversationId: conversationId
      });
    }

    // Return the AI's response
    return aiResponse;
  } catch (error: any) {
    console.error(`Error in ai.service.ts -> getGroqChatResponse:`, error?.message || error);
    throw new Error(`Failed to get response from AI service: ${error?.message || error}`);
  }
}

// Generate a conversation ID from two user IDs (sorted to ensure consistency)
function generateConversationId(user1Id: string | Types.ObjectId, user2Id: string | Types.ObjectId): string {
  const id1 = user1Id.toString();
  const id2 = user2Id.toString();
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}_${sortedIds[1]}`;
}
