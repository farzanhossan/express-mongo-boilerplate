import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import indexRouter from './routes/index';

require('./lib/db/db');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', indexRouter);

/** Error handling */
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found');
  res.status(404).json({
    success: false,
    message: error.message,
    data: null,
  });
});

export default app;
