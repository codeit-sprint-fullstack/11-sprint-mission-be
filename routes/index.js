import express from 'express';
import { postRouter } from './posts.js';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello Express🚀',
    timestamp: new Date().toISOString(),
  })
})

router.use('/posts', postRouter);