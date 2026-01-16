import express from 'express';

const app = express();
const PORT = 5005;

//josn 파싱
app.use(express.json());

//라우터
app.get('/', (req, res) => {
  res.json({
    message: 'Hello Expres!',
    timestamp: new Date().toISOString(),
  });
});

//서버시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
