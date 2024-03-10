import express from 'express';
import { verifyToken } from '../lib/utils/authorization';
import userController from '../modules/user/user.controller';

const userRouter = express.Router();

// user routes
userRouter.get('/:id', verifyToken, userController.getById);
userRouter.patch('/:id', verifyToken, userController.updateById);
userRouter.delete('/:id', verifyToken, userController.deleteById);
userRouter.post('/change-password', verifyToken, userController.changePassword);
userRouter.post('/forgot-password', userController.forgotPassword);
// userRouter.post('/reset-password', userController.resetPassword);

export default userRouter;
