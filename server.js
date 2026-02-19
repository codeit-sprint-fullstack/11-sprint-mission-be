import express from 'express';
import cors from 'cors';
import { prisma } from '#db/prisma.js';
import { config } from './src/config/config.js';
import { router as apiRouter } from '#routes/index.js';
import { errorHandler } from './src/middleware/errorHandler.middleware.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', apiRouter);

app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(`서버가 http://localhost:${config.PORT}에서 시작되었습니다!`);
});

// 서버 안전하게 종료
const shutdown = async (signal) => {
  console.log(`\n${signal} 신호를 받았습니다. 서버를 종료합니다.`);
  server.close(async () => {
    console.log('HTTP 서버가 닫혔습니다.');
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
