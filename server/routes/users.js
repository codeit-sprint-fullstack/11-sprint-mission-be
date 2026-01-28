import express from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export { userRouter };
