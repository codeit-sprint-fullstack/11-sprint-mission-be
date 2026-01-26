import express from 'express';
import { articlesRouter } from './articles.routes.js';
import { articleCommentsRouter } from './comments/comments.routes.js';

export const articleRouter = express.Router();

articleRouter.use('/', articlesRouter);
articleRouter.use('/:articleId/comments', articleCommentsRouter)