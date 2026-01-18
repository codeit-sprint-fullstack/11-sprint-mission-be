import express from "express";
import { connectDB, disconnectDB } from "./db/index.js";
import { router } from "./routers/index.js";
import { config } from "./config/config.js";

const app = express();
await connectDB();

app.use(express.json());

app.use("/", router); //router index에 모든 라우터 등록

const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});
const shutdown = (signal) => {
  console.log(`${signal} : shutdown!`);
  server.close(() => {
    console.log("HTTP server closed.");
    disconnectDB();
  });
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
