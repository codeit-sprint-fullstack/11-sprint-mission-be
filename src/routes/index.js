import express from 'express';
import { productRouter } from './products.js';
import { searchRouter } from './search.js';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello Express!',
    timestamp: new Date().toISOString(),
  });
});

router.use('/products', productRouter);
router.use('/search', searchRouter);
