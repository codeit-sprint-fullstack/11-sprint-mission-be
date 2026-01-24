import express from 'express'
import { articleRouter } from './articles/articles.routes.js';


export const router = express.Router();

router.use('/articles', articleRouter)
// router.use('/products' productRouter)