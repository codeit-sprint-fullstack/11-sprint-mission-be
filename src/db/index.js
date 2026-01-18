import mongoose from "mongoose";
import { config } from "../config/config.js";

//db연결 확인,실패 확인
export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); //운영체제에 다루는 프로세스. 비정상 종료
  }
};
export const disconnectDB = async () => {
  await mongoose.connection.close();
};
