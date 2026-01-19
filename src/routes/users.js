import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import { NotFoundException } from '../errors/notFoundException.js';
import { ConflictException } from '../errors/conflictException.js';
import { User } from '../models/user.model.js';

export const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users, count: users.length });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', validateUser, async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다');
    }

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({
      success: true,
      data: newUser,
      message: '사용자가 생성되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

userRouter.patch('/:id', validateUser, async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { id: userId } = req.params;

    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      throw new ConflictException('중복된 이메일입니다.');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    res.json({
      success: true,
      data: updatedUser,
      message: '사용자가 수정되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    res.json({ success: true, message: '사용자가 삭제되었습니다' });
  } catch (error) {
    next(error);
  }
}); 
