import express from 'express';
import { articleRouter } from './article/article.router.js';
import { commentRouter } from './comment/comment.router.js';

export const routers = express.Router();

routers.use('/article', articleRouter);
routers.use('/comment', commentRouter);
