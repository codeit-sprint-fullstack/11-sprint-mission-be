import app from './app.js';
import { config } from './config/config.js';
import { connectDB, disconnectDB } from './db/index.js';

const startServer = async () => {
  await connectDB();

  const server = app.listen(config.PORT, () => {
    console.log(`서버거ㅏ ${config.PORT}번 포트에서 시작되었습니다!`);
  });

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
};

startServer();
