import express, { Request, Response } from 'express';
import authRouter from './auth.routes';
import productRouter from './product.routes';
import uploadRouter from './upload.routes';
import userRouter from './user.routes';

const indexRouter = express.Router();

indexRouter.get('/', (req: Request, res: Response) => {
  res.send('Welcome, Your app is working');
});

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/products', productRouter);
indexRouter.use('/upload', uploadRouter);

export default indexRouter;
