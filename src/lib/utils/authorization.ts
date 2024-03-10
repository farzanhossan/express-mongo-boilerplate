import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import config from '../config/config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token)
      return res.status(401).send({
        success: false,
        message: 'Access Denied',
        data: null,
      });

    const verified = jwt.verify(token, config.jwt.secret);
    if (!verified)
      return res.status(401).send({
        success: false,
        message: 'Access Denied',
        data: null,
      });

    next();
  } catch (error: any) {
    res.status(401).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
