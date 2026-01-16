import express from 'express';
import { router } from './routes/index.js';
import { cors } from './middlewares/cors.middleware.js';
import { config } from './config/config.js';
import { connectDB, disconnectDB } from './db/index.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// JSON 파싱
app.use(express.json());

// cors
app.use(cors);

// router
app.use(router);

// error-handler
app.use(errorHandler);

// DB 연결
await connectDB();

const server = app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

// 안전한 종료 (Graceful Shutdown) 로직 추가
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    console.log('HTTP server closed.');
    await disconnectDB();
  });
};

// SIGINT, SIGTERM 신호를 감지하여 shutdown 함수를 실행합니다
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
