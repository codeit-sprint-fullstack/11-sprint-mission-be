import express from 'express'
import { articleRouter } from './articles/index.js';
import { commentRouter } from './comments/index.js';
import { productRouter } from './products/index.js';


export const router = express.Router();

router.use('/articles', articleRouter)
router.use('/comments', commentRouter)
router.use('/products', productRouter)