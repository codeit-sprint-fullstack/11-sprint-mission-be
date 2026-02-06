import mongoose from 'mongoose';
import { config } from '../config/config,js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('✅ MongoDB connected successfully.');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// 애플리케이션 종료 시 DB 연결 해제
export const disconnectDB = async () => {
  await mongoose.connection.close();
};
