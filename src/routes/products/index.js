import express from 'express';
import { productCommentsRouter } from './productComments.routes.js';

export const productRouter = express.Router();

productRouter.use('/:productId/comments', productCommentsRouter); 
