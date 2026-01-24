import express from 'express';
import { config } from '#config';
import { router } from './routes/index.js';
import cors from 'cors';
import { errorHandler } from '#middlewares';
import { connectDB, disconnectDB } from '#db/index.js';

const app = express();
connectDB();

// JSON 파싱 미들웨어
app.use(express.json());

// cors
app.use(cors());

// 모든 라우트 등록
app.use('/', router);

// 에러 핸들링
app.use(errorHandler);

// 서버 시작
const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});

// Graceful Shutdown
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    disconnectDB();
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
