import mongoose from 'mongoose';
import { config } from '../src/config/config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};
