// Review.ts
import { Schema, model, Types } from "mongoose";

const ReviewSchema = new Schema(
  {
    counsellor: { type: Types.ObjectId, ref: "User", required: true },
    reviewer: { type: Types.ObjectId, ref: "User", required: true },   // who gave the review
    reviewerUid: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, trim: true },
    sessionId: { type: String },
  },
  { timestamps: true }
);

ReviewSchema.index({ counsellor: 1 });

export type ReviewDoc = {
  _id: Types.ObjectId;
  counsellor: Types.ObjectId;
  reviewer: Types.ObjectId;
  reviewerUid: string;
  rating: number;
  description?: string;
  sessionId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const Review = model<ReviewDoc>("Review", ReviewSchema);
