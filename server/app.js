import express from 'express';
import cors from 'cors';
import productRouter from './routes/productRouter.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';

const app = express();

// 기본 설정
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use('/products', productRouter);

// 404 에러 처리
app.use((req, res, next) => {
  res.status(404).json({ message: 'API를 찾을 수 없습니다.' });
});

// 에러 처리
app.use(errorHandler);

export default app;
