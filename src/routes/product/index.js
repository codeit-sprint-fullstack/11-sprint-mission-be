import express from 'express';
import { productsRouter } from './products.routes.js';

export const productRouter = express.Router();

// product CRUD 라우트 연결
productRouter.use('/', productsRouter);
