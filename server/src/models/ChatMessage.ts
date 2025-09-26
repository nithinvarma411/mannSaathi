import { Schema, model, Types } from "mongoose";

const ChatMessageSchema = new Schema(
  {
    senderId: { type: Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    conversationId: { type: String, required: true }, // Format: userId1_userId2 (sorted alphabetically)
  },
  { timestamps: true }
);

// Indexes for efficient querying
ChatMessageSchema.index({ senderId: 1 });
ChatMessageSchema.index({ receiverId: 1 });
ChatMessageSchema.index({ conversationId: 1 });
ChatMessageSchema.index({ createdAt: 1 });

export type ChatMessageDoc = {
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const ChatMessage = model<ChatMessageDoc>("ChatMessage", ChatMessageSchema);