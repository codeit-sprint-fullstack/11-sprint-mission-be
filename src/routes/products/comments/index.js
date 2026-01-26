import express from 'express';
import { productCommentsRouter as router} from './comments.routes.js';

export const productCommentsRouter = express.Router({
  mergeParams: true,
})

productCommentsRouter.use('/', router)