import express from 'express';
import articleRouter from './article/index.js';
import productRouter from './product/index.js';
import commentRouter from './comment/index.js';

export const router = express.Router();

// 라우터 연결
router.use('/products', productRouter);
router.use('/articles', articleRouter); 
router.use('/comments', commentRouter);
