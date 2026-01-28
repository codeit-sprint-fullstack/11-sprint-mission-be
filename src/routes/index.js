import express from 'express';
import { productRouter } from './productRoutes.js';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello Express🚀',
    timestamp: new Date().toISOString(),
  })
})

router.use('/items', productRouter);