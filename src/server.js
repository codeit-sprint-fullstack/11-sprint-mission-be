import express from 'express';
import { router } from './routes/index.js';
import { logger } from './middlewares/logger.js';
import { requestTimer } from './middlewares/requestTimer.js';
import { cors } from './middlewares/cors.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config, isDevelopment } from './config/config.js';
import { connectDB } from './db/index.js';

const app = express();
const PORT = 5005;
connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

if (isDevelopment) {
  app.use(logger);
  app.use(requestTimer);
}

app.use(express.static('public'));
app.use(cors);
app.use(logger);
app.use(requestTimer);

app.use('/', router);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});

const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    disconnectDB();
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
