import express from 'express';
import { prisma } from '#db/prisma.js';
import { config } from '#config';
import { articlesRouter } from './routes/articles.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { articleCommentsRouter } from './routes/articleComments.routes.js';
import { productCommentsRouter } from './routes/productComments.routes.js';
import { commentsRouter } from './routes/comments.routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(express.json());

app.listen(config.PORT, () => {
  console.log(
    `[${config.NODE_ENV}] server running at http://localhost:${config.PORT}`,
  );
});

app.use('/articles', articlesRouter);
app.use('/products', productsRouter);
app.use('/articles/:articleId/comments', articleCommentsRouter);
app.use('/products/:productId/comments', productCommentsRouter);
app.use('/comments', commentsRouter);

app.use(errorHandler);

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
