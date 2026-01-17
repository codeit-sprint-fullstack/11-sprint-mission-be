import express from 'express';
import { router } from '../routes/index.js';
import { logger } from '../middlewares/logger.js';
import { requestTimer } from '../middlewares/requestTimer.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { connectDB, disconnectDB } from '../db/index.js';
import { config, isDevelopment } from './config/config.js';
import { cors } from '../middlewares/cors.js';

const app = express();
await connectDB();
const PORT = 5005;

//josn 파싱
app.use(express.json());
//URL 인코딩파싱
app.use(express.urlencoded({ extended: true }));
//cors 미들웨어
app.use(cors);

//범용 미들웨어
if (isDevelopment) {
  //로깅미들웨어
  app.use(logger);
  //요청시간측정 미들웨어
  app.use(requestTimer);
}

//라우터
app.use('/', router);

//에러 핸들링
app.use(errorHandler);

//서버시작
const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});

//안전한 종료 로직
const shotdown = (single) => {
  console.log(`\n${single} received, Shutting down gracefully...`);

  server.close(async () => {
    console.log('HTTP server closed.');
    await disconnectDB();
  });
};

process.on('SIGINT', () => shotdown('SIGINT'));
process.on('SIGTERM', () => shotdown('SIGTERM'));
