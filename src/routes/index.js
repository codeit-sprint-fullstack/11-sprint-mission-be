import express from 'express';
import { productsRouter } from './products.routes.js';
import { HTTP_STATUS } from '../constants/http-status.js';

export const router = express.Router();

// 기본 라우트
router.get('/', (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    message: 'OK',
    timestamp: new Date().toISOString(),
  });
});

router.use('/products', productsRouter);
