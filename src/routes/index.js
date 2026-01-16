import express from 'express';
import { productsRouter } from './products.js';

export const router = express.Router();

router.use('/products', productsRouter);