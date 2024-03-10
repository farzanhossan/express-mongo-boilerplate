import Joi from 'joi';

export const authValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    phoneNumber: Joi.string().min(8).max(15).message(`${data.phoneNumber} is not a valid phone number`),
    email: Joi.string().email().message(`${data.email} is not a valid email`).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
