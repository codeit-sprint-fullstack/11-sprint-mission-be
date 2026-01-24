import express from 'express';
import { productsRouter } from './product.Router.js';

export const productRouter = express.Router();

// product CRUD 라우트 연결
productRouter.use('/', productsRouter);

export default productRouter;
