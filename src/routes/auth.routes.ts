import express from 'express';
import authController from '../modules/auth/auth.controller';

const authRouter = express.Router();

// auth routes
authRouter.post('/user/register', authController.userResister);
authRouter.post('/user/login', authController.userLogin);

export default authRouter;
