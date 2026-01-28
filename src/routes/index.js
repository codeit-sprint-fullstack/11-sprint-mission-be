import express from 'express';
import { productRouter } from './products/index.js';
import { articleRouter } from './articles/index.js';
import { commentRouter } from './comments/index.js';
import { HTTP_STATUS } from '../constants/http-status.js';

export const router = express.Router();

router.get('/', (req, res) => {
  res
    .status(HTTP_STATUS.OK)
    .send({ now: new Date().toISOString(), message: 'OK' });
});

router.use('/products', productRouter);
router.use('/articles', articleRouter);
router.use('/comments', commentRouter);
