import express from 'express';
import { productRouter } from './product/product.Router.js';

export const router = express.Router();

// 라우터 연결
router.use('/products', productRouter);
router.use('/articles', articleRouter);
