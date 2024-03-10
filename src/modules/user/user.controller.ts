import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../lib/config/config';
import mailer from '../../lib/utils/mailer';
import { responseData } from '../../lib/utils/responseData';
import { authValidation } from '../auth/auth.validator';
import User from './user.model';
import userService from './user.service';

const userController = {
  create: async (req: Request, res: Response) => {
    // const password = toolbox.generatePassword();
    try {
      // before registration data validation
      const { error } = authValidation({
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
      });

      if (error)
        return res.status(400).json({
          success: false,
          message: error?.details[0]?.message,
          data: null,
        });

      // checking if the user already in database
      const phoneExist = await User.findOne({ phoneNumber: req.body.phoneNumber });
      if (phoneExist)
        return res.status(400).send({
          success: false,
          message: 'Phone Number is already exits',
          data: null,
        });

      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist)
        return res.status(400).send({
          success: false,
          message: 'Email is already exits',
          data: null,
        });

      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        ...req.body,
        password: hashPassword,
      };

      const user = await userService.create(newUser);
      let data = JSON.parse(JSON.stringify(user));
      delete data.password;
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const query: any = { ...req.query };
      delete query.page;
      delete query.limit;
      const users = await userService.get(query);
      const data = JSON.parse(JSON.stringify(users))?.map((u: any) => {
        delete u.password;
        return { ...u };
      });
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await userService.getById(id);
      let data = JSON.parse(JSON.stringify(user));
      delete data.password;
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  updateById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user: any = await User.findById(id);

      // checking if the admin already in database
      const phoneExist: any = await User.findOne({
        phoneNumber: req.body.phoneNumber,
      });
      if (user.phoneNumber != req.body.phoneNumber && phoneExist)
        return res.send({
          success: false,
          message: 'Phone Number is already exits',
          data: null,
        });

      const emailExist: any = await User.findOne({
        email: req.body.email,
      });

      if (user.email != req.body.email && emailExist)
        return res.send({
          success: false,
          message: 'Email is already exits',
          data: null,
        });

      if (req.body.password) {
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const updatedUser = await userService.updateById(id, { ...req.body, password: hashPassword });
        let data = JSON.parse(JSON.stringify(updatedUser));
        delete data.password;
        return responseData({ req, res, data });
      }

      const updatedUser = await userService.updateById(id, req.body);
      let data = JSON.parse(JSON.stringify(updatedUser));
      delete data.password;
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deletedUser = await userService.deleteById(id);
      let data = JSON.parse(JSON.stringify(deletedUser));
      delete data.password;
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  changePassword: async (req: Request, res: Response) => {
    const user = await userService.getById(req.body.id);
    if (!user)
      return res.send({
        success: false,
        message: 'Old Password is wrong',
        data: null,
      });

    // Is the password is correct
    const validPass = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!validPass)
      return res.send({
        success: false,
        message: 'Old Password is wrong',
        data: null,
      });

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

    const updatedUser = await userService.updateById(user._id, {
      password: hashPassword,
    });
    const token = jwt.sign({ id: updatedUser?._id }, config.jwt.secret);
    if (updatedUser)
      return res.send({
        success: true,
        message: 'Your Password is changed',
        data: {
          token: token,
        },
      });
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user)
        return res.send({
          success: false,
          message: 'Email not exits',
          data: null,
        });

      return mailer(req, res);
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  // resetPassword: async (req: Request, res: Response) => {
  //   try {
  //     const otpData: any = await Otp.findOne({
  //       email: req.body.email,
  //       otp: req.body.otp,
  //     });

  //     if (!otpData)
  //       return res.send({
  //         success: false,
  //         message: 'In valid opt',
  //         data: null,
  //       });

  //     const currentTime = new Date().getTime();
  //     const isValid = otpData.expireIn - currentTime > 0;

  //     if (isValid) {
  //       const user: any = await User.findOne({ email: req.body.email });

  //       // hash the password
  //       const salt = await bcrypt.genSalt(10);
  //       const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

  //       const updatedUser = await userService.updateById(user._id, {
  //         password: hashPassword,
  //       });
  //       const token = jwt.sign({ id: updatedUser?._id }, config.jwt.secret);
  //       if (updatedUser) {
  //         await Otp.findByIdAndDelete(otpData._id);
  //         return res.send({
  //           success: true,
  //           message: 'Your Password is changed',
  //           data: {
  //             token: token,
  //           },
  //         });
  //       } else {
  //         return res.send({
  //           success: false,
  //           message: 'Something is wrong try again',
  //           data: {
  //             token: null,
  //           },
  //         });
  //       }
  //     } else {
  //       return res.send({
  //         success: false,
  //         message: 'Otp is expired',
  //         data: {
  //           token: null,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     return responseData({ req, res, error });
  //   }
  // },
};

export default userController;
