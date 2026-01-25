import express from 'express';
import { productsRouter } from './products.routes.js';
import { productCommentsRouter } from './comments/comments.routes.js';


export const productRouter = express.Router();

productRouter.use('/', productsRouter);
productRouter.use('/:productId/comments', productCommentsRouter)