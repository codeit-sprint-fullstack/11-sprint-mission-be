import express from 'express';
import { config, isDevelopment } from './config/config.js';
import { router } from './routes/index.js';
import { cors, errorHandler, logger } from '#middlewares';
import { prisma } from '#db/prisma.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);

if (isDevelopment) {
  app.use(logger);
}

app.use(express.static('public'));

app.use('/api', router);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(
    `[${config.NODE_ENV}] Server running at http://localhost:${config.PORT}`,
  );
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
