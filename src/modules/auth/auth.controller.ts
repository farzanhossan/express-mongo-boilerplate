import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { authValidation } from './auth.validator';
import User from '../user/user.model';
import config from '../../lib/config/config';
import { responseData } from '../../lib/utils/responseData';

const userResister = async (req: Request, res: Response) => {
  try {
    const { error } = authValidation(req.body);
    if (error)
      return res.send({
        success: false,
        message: error.details[0].message,
        data: null,
      });

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.send({
        success: false,
        message: 'Email is already exits',
        data: null,
      });

    // hash the password
    const salt = await bcrypt.genSalt(parseInt(config.jwt.saltRound));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      // phoneNumber: req.body.phoneNumber,
      password: hashPassword,
    });
    const resistedUser = await newUser.save();

    // create and assign a token
    const token = jwt.sign({ id: resistedUser._id }, config.jwt.secret);
    res.header('auth-token', token).send({
      success: true,
      message: 'Register success',
      data: {
        token: token,
      },
    });
  } catch (error) {
    return responseData({ req, res, error });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    // checking if the user is exist
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.send({
        success: false,
        message: 'Email is wrong',
        data: null,
      });

    // Is the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass)
      return res.status(401).json({
        success: false,
        message: 'Password is wrong',
        data: null,
      });

    // create and assign a token
    const token = jwt.sign({ id: user._id }, config.jwt.secret);
    res.header('auth-token', token).send({
      success: true,
      message: 'login success',
      data: {
        token: token,
      },
    });
  } catch (error) {
    return responseData({ req, res, error });
  }
};

const authController = {
  userResister,
  userLogin,
};

export default authController;
