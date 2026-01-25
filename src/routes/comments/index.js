import express from 'express';
import { commentsRouter } from './comments.routes.js';

export const commentRouter = express.Router();

// Commnet CRUD 라우트 연결
commentRouter.use('/', commentsRouter);
