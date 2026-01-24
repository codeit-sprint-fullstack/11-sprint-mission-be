import express from 'express'
import { articleRouter } from './articles/articles.routes.js';
import { commentRouter } from './comments/index.js';


export const router = express.Router();

router.use('/articles', articleRouter)
router.use('/comments', commentRouter)
// router.use('/products' productRouter)