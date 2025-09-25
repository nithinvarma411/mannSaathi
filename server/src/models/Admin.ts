import { Schema, model, Types } from 'mongoose';

const AdminSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

export type AdminDoc = {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
};

export const Admin = model<AdminDoc>('Admin', AdminSchema);
