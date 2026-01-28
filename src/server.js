import express from 'express';
import { routers } from './routes/index.js';
import { config } from './config/config.js';
import { cors } from './middlewares/cors.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();
const PORT = config.PORT;

// JSON 파싱 미들웨어
app.use(express.json());

// cors 체크
app.use(cors);

app.use('/', routers);

//에러 핸들러
app.use(errorHandler);

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
