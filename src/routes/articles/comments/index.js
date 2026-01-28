import express from 'express';
import { articleCommentsRouter as router } from './article-comments.routes.js';

export const articleCommentsRouter = express.Router({
  mergeParams: true,
});

articleCommentsRouter.use('/', router);
