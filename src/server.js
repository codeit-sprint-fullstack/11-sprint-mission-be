import express from 'express';
import { config, isDevelopment } from '#config';
import { connectDB, disconnectDB } from '../db/index.js';
import { cors } from './middlewares/cors.js';
import { requestTimer } from './middlewares/requestTimer.js';
import { logger } from './middlewares/logger.js';
import { productRouter } from './routes/product.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
await connectDB();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

if (isDevelopment) {
  app.use(requestTimer);
  app.use(logger);
}

app.use('/api', productRouter);

app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});

const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully.`);
  server.close(async () => {
    console.log('HTTP server closed.');
    await disconnectDB();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
