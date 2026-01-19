import express from 'express';

export const userRouter = express.Router();

const users = [
  { id: 1, name: '박창기', email: 'kim@example.com' },
  { id: 2, name: '임경민', email: 'lee@example.com' },
  { id: 3, name: '김진영', email: 'jin@example.com' },
  { id: 4, name: '이보희', email: 'boh@example.com' },
  { id: 5, name: '백수현', email: 'baek@example.com' },
  { id: 6, name: '류제희', email: 'ryu@example.com' },
  { id: 7, name: '최진영', email: 'choi@example.com' },
  { id: 8, name: '김유신', email: 'yushin@example.com' },
  { id: 9, name: '오마린', email: 'omarin@example.com' },
  { id: 10, name: '고영우', email: 'goyoung@example.com' },
  { id: 11, name: '이정윤', email: 'jungyun@example.com' },
  { id: 12, name: '박지은', email: 'jieun@example.com' },
  { id: 13, name: '김윤기', email: 'yoonki@example.com' },
  { id: 14, name: '이유리', email: 'yuri@example.com' },
  { id: 15, name: '박성훈', email: 'sunghoon@example.com' },
];
let nextId = 16;

userRouter.get('/', (req, res) => {
  res.json({ success: true, data: users, count: users.length });
});

userRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다',
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

userRouter.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      massage: '이름과 이메일은 필수입니다',
    });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: '이미 존재하는 이메일입니다',
    });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
    message: '사용자가 생성되었습니다',
  });
});

userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

userRouter.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({
      success: false,
      message: '수정할 정보를 입력해주세요(name 또는 email)',
    });
  }

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다',
    });
  }

  if (email) {
    const existingUser = users.find((u) => u.email === email && u.id !== id);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: '이미 존재하는 이메일입니다',
      });
    }
  }
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  users[userIndex].updatedAt = new Date().toISOString();

  res.json({
    success: true,
    data: users[userIndex],
    message: `사용자 ${req.params.id} 업데이트`,
  });
});

userRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다',
    });
  }

  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);

  res.json({
    success: true,
    data: deletedUser,
    message: '사용자가 삭제되었습니다',
  });
});
