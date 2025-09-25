import { Schema, model, Types } from 'mongoose';

const UniversitySchema = new Schema({
  uniName: { type: String, required: true, unique: true },
  aisheCode: { type: String, required: true, unique: true },
  domain: { type: String },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  approvedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export type UniversityDoc = {
  _id: Types.ObjectId;
  uniName: string;
  aisheCode: string;
  domain?: string;
  contactEmail: string;
  contactPhone?: string;
  approvedAt: Date;
};

export const University = model<UniversityDoc>('University', UniversitySchema);
