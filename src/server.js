import express from 'express';
import { prisma } from '#db/prisma.js';
import { config } from '#config';
import { router as apiRouter } from './routes/index.js';
import cors from 'cors';
import { errorHandler } from '#middlewares';
import { setupGracefulShutdown } from './utils/graceful-shutdown.util.js';

const app = express();

// JSON 파싱 미들웨어
app.use(express.json());

// cors
app.use(cors());

// API 라우터 등록
app.use('/api', apiRouter);

// 에러 핸들링
app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(
    `[${config.NODE_ENV}] ✅ Server running at http://localhost:${config.PORT}`,
  );
});

// Setup graceful shutdown handlers
setupGracefulShutdown(server, prisma);
