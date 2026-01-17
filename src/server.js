import express from 'express';
import { connectDB, disconnectDB } from './db/index.js';
import { config, isDevelopment } from './config/config.js';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { cors } from './middlewares/cors.js';
import { logger } from './middlewares/logger.js';

const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);

if (isDevelopment) {
  app.use(logger);
}

app.use(express.static('public'));

app.use('/api', router);

app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});

const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    console.log('HTTP server closed.');
    await disconnectDB();
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
