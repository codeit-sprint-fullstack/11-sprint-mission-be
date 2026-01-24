import express from 'express';

import { commentsRouter } from './comment.Router.js';

export const commentRouter = express.Router();

// comment CRUD 라우트 연결
commentRouter.use('/', commentsRouter);

export default commentRouter;