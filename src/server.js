import express from 'express';

const app = express();
const PORT = 5005;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello Express!',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
