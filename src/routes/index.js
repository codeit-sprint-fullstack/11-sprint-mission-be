import express from 'express';
import { itemsRouter } from './items.routes.js';

export const router = express.Router();

router.use('/items', itemsRouter);