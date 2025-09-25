import { Schema, model } from 'mongoose';

const PendingUniversitySchema = new Schema({
  uniName: { type: String, required: true },
  aisheCode: { type: String, required: true, unique: true },
  domain: { type: String },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String }
}, { timestamps: true });

export const PendingUniversity = model('PendingUniversity', PendingUniversitySchema);
