import express from 'express';
const PORT = 5005;

export const userRouter = express.Router();

userRouter.get('/users', (req, res) => {
  res.json({ users: [] });
});

userRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

userRouter.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: '사용자 생성됨', name, email });
});

userRouter.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

userRouter.put('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

userRouter.delete('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});
