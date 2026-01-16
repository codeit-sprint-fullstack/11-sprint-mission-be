import express from 'express';

const app = express();
const PORT = 5005;

app.use(express.json());

app.get('/users', (req, res) => {
  res.json({ users: [] });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

app.get('/search', (req, res) => {
  const { q, limit = 10 } = req.query;
  res.json({ query: q, limit: Number(limit) });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: '사용자 생성됨', name, email });
});

app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

app.put('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

app.delete('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
