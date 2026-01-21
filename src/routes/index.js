import express from 'express';
import { productRouter } from './product.router.js';

export const routers = express.Router();

routers.use('/products', productRouter);
