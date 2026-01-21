import express from "express";
import { prisma } from "#db/prisma.js";
import { config } from "#config";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, prisma!");
});

app.listen(config.PORT, () => {
  console.log(
    `[${config.NODE_ENV}] server running at http://localhost:${config.PORT}`,
  );
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
