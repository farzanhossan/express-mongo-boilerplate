import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import config from '../config/config';

const mailer = (req: Request, res: Response) => {
  const otpCode = Math.floor(Math.random() * 10000 + 1).toString();

  const transPorter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailer.gmail,
      pass: config.mailer.pass,
    },
  });

  const mailOptions: MailOptions = {
    from: config.mailer.gmail,
    to: req.body.email,
    subject: 'Your one time password - impactment',
    text: 'Your Otp is ' + otpCode,
  };

  transPorter.sendMail(mailOptions, async (error, info) => {
    // error message sent
    if (error)
      return res.send({
        success: false,
        message: error.message,
      });
  });
};

export default mailer;
