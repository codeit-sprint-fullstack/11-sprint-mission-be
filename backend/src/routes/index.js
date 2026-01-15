import express from 'express';
import { itemRouter } from './items.js';
import { searchRouter } from './search.js';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello Express!',
    timestamp: new Date().toISOString(),
  });
});

router.use('/api/items', itemRouter);
router.use('/search', searchRouter);
