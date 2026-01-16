import express from 'express';
import { router } from '../routes/index.js';
import { logger } from '../middlewares/logger.js';
import { requestTimer } from '../middlewares/requestTimer.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const app = express();
const PORT = 5005;

//josn 파싱
app.use(express.json());

//로깅미들웨어 
app.use(logger); 

//요청시간측정 미들웨어 
app.use(requestTimer);

//라우터
app.use('/', router);

app.use(errorHandler);

//서버시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
