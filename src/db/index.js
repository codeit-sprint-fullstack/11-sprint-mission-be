// DB 연결

import { PrismaClient } from '../../generated/prisma/index.js';



export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB와 연결 성공!');
  } catch (err) {
    console.error('MongoDB와 연결 실패:', err);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('MongoDB와 연결이 끊어졌습니다.');
};
