import express from 'express';
import { productCommentsRouter as router } from './product-comments.routes.js';

export const productCommentsRouter = express.Router({
  mergeParams: true,
});

productCommentsRouter.use('/', router);
