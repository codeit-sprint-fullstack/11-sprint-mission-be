import express from 'express';
import { articlesRouter } from './article.Router.js';

export const articleRouter = express.Router();

// article CRUD 라우트 연결
articleRouter.use('/', articlesRouter);

export default articleRouter;
