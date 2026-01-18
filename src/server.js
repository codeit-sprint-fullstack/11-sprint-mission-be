import express from "express";
import { connectDB,disconnectDB } from "./db";
import { router } from "./routers";
const PORT = 3000;

const app = express();
await connectDB();

app.use(express.json());


app.use('/',router);//router index에 모든 라우터 등록

const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

await shutdown = (signal) =>{
    console.log(`${signal} : shutdown!`);
    server.close(()=>{
        console.log('HTTP server closed.');
        disconnectDB();
    });

};
process.on('SIGINT',()=>shutdown('SIGINT'));
process.on('SIGTERM',()=>Shutdown('SIGTERM'));