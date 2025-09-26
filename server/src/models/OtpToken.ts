// models/OtpToken.ts
import { Schema, model, Types } from "mongoose";

export type OtpPurpose = "SET_PASSWORD" | "UNI_ADMIN_REG";

export interface OtpTokenDoc {
  _id: Types.ObjectId;
  userId?: Types.ObjectId;
  email?: string;
  code: string;
  purpose: OtpPurpose;
  meta?: {
    universityId?: Types.ObjectId;
    name?: string;
    phone?: string;
    uid?: string;
  };
  createdAt: Date;
  expiresAt: Date;
}

const OtpTokenSchema = new Schema<OtpTokenDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    email: { type: String, lowercase: true },
    code: { type: String, required: true },
    purpose: { type: String, enum: ["SET_PASSWORD", "UNI_ADMIN_REG"], required: true },
    meta: {
      universityId: { type: Schema.Types.ObjectId, ref: "University" },
      name: { type: String },
      phone: { type: String },
      uid: {type: String}
    },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 5 * 60 * 1000) }, // 5 min
  },
  { timestamps: true }
);

export const OtpToken = model<OtpTokenDoc>("OtpToken", OtpTokenSchema);
