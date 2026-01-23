import express from "express";
import { prisma } from "#db/prisma.js";
import { config } from "#config";
import { cors } from "./middlewares/cors.middleware.js";
import { setupGracefulShutdown } from "./utils/graceful-shutdown.util.js";

const app = express();

app.use(express.json());

app.use(cors);

// app.use('/api', apiRouter);

// app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(
    `[${config.NODE_ENV}] Server running at http://localhost:${config.PORT}`,
  );
});

// Setup graceful shutdown handlers
setupGracefulShutdown(server, prisma);