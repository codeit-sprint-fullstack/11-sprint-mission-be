import express from 'express';
import { articlesRouter } from './articles.routes.js';
import { articleCommentsRouter } from './comments/index.js';

export const articleRouter = express.Router();

articleRouter.use('/', articlesRouter);
articleRouter.use('/:id/comments', articleCommentsRouter);
