import express from 'express';
import { articlesRouter } from './articles.routes.js';
import { productsRouter } from './products.routes.js';

export const router = express.Router();

router.use('/articles', articlesRouter);
router.use('/products', productsRouter);
