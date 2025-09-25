import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema(
  {
    universityId: { type: Types.ObjectId, ref: "University", index: true, required: true },
    name: { type: String, required: true },
    uid: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["student", "counsellor", "uni-admin"], required: true },
    passwordHash: { type: String },
    isActive: { type: Boolean, default: true },

    // ⭐ Only used for counsellors
    avgRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserSchema.index({ universityId: 1, uid: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

export type Role = "student" | "counsellor" | "uni-admin";

export type UserDoc = {
  _id: Types.ObjectId;
  universityId: Types.ObjectId;
  name: string;
  uid: string;
  email: string;
  phone: string;
  role: Role;
  passwordHash?: string;
  isActive: boolean;

  // For counsellors only
  avgRating?: number;
  ratingCount?: number;
};

export const User = model<UserDoc>("User", UserSchema);
