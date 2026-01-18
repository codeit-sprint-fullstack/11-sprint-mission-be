import express from "express";
import { productRouter } from "./products.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "express router 🔗",
    timestamp: new Date().toISOString(),
  });
});

router.use("/products", productRouter);
