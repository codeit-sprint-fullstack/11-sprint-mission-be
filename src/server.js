import express from "express";
import { config } from "#config";
import { router } from "./routes/index.js";
import { connectDB, disconnectDB } from "#db/index.js";
import { cors, errorHandler } from "#middlewares";



const app = express();

//DB 연결
await connectDB();

//JSON 파싱 미들웨어 
app.use(express.json());

//URL 인코딩 파싱 미들웨어
app.use(express.urlencoded({ extended: true })); 

//CORS 미들웨어
app.use(cors);

//모든 라우트 등록
app.use('/', router);

// 에러 핸들링 
app.use(errorHandler)


const server = app.listen(config.PORT, () => {
  console.log(
    `[${config.NODE_ENV}] Server running at http://localhost:${config.PORT}`
  );
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