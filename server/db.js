import mongoose from "mongoose";
import { config } from "./config.js";

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

export async function connectDB(retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(config.mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("MongoDB connected");
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt}/${retries} failed:`, err.message);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY * attempt));
      }
    }
  }
  console.error("Failed to connect to MongoDB after all retries");
  process.exit(1);
}

export default mongoose;
