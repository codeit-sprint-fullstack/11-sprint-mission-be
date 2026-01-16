import express from 'express';

export const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json({ users: [] });
});

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

userRouter.post('/', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: '사용자 생성됨', name, email });
});

userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

userRouter.patch('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

userRouter.delete('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});
