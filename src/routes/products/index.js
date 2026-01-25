import express from 'express';
import { productsRouter } from './products.routes.js';
import { productCommentsRouter } from './comments/index.js';

export const productRouter = express.Router();

productRouter.use('/', productsRouter);
productRouter.use('/:id/comments', productCommentsRouter);
