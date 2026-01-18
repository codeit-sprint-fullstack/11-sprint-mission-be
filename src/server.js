import express from "express";
const PORT = 3000;

const app = express();
//await connectDB();

app.use(express.json());
app.get("/products", (req, res) => {
  res.json({ products: [] });
});
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  res.json({ message: "사용자 생성됨", name, price });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
