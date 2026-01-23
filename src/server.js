import express from 'express';
import cors from 'cors';
import { config } from '#config';
import { connectDB, disconnectDB } from '#db/index.js';
import router from '#routes/index.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(`서버가 http://localhost:${config.PORT}에서 시작되었습니다!`);
});

// 서버 안전하게 종료
const shutdown = async (signal) => {
  console.log(`\n${signal} 신호를 받았습니다. 서버를 종료합니다.`);
  server.close(async () => {
    console.log('HTTP 서버가 닫혔습니다.');
    await disconnectDB();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
