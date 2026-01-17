import express from 'express';
import { productRouter } from './productRoutes.js';

export const router = express.Router();

router.use('/items', productRouter);