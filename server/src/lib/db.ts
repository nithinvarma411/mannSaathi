import mongoose from "mongoose";
import { config } from "../config/index";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(config.mongoUri);
    console.log("✅ Mongo connected");
  } catch (err: any) {
    console.error(
      `Error in db.ts -> connectDB: ${err.message || err}`
    );
    throw new Error("Failed to connect to MongoDB");
  }
}
