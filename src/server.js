import express from 'express';
import { router } from './routes/index.js';
import { config } from './config/config.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { cors } from './middlewares/cors.js';

const app = express();

// JSON 파싱 미들웨어
app.use(express.json());

// cors
app.use(cors);

// 모든 라우트 등록
app.use('/', router);

// 에러 핸들링
app.use(errorHandler);

// 서버 시작
app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});
