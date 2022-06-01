import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  childName: Joi.string()
    .min(3)
    .max(200)
    .messages({ 'string.empty': 'Name cannot be empty.' })
    .required(),
  email: Joi.string()
    .email()
    .min(12)
    .max(50)
    .messages({ 'string.empty': 'Email cannot be empty.' })
    .required(),
  phoneNumber: Joi.number()
    // .max(15)
    .messages({ 'number.empty': 'Phone number is required.' })
    .required(),
  countryCode: Joi.number()
    // .max(3)
    .messages({ 'number.empty': 'Country code is required.' })
    .required(),
  password: Joi.string()
    .min(8)
    .max(100)
    .messages({
      'string.empty': 'Password cannot be empty',
      'string.min': 'Minimum of 8 characters',
      'string.max': 'Maximum of 100 characters'
    })
    .required(),
  confirmPassword: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': 'Passwords do not match' }),
    // .messages({ 'any.only': '{{#label}} does not match' }),
  grade: Joi.string().required()
});

const userValidate = (req: Request, res: Response, next: NextFunction) => {
  schema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err: { message: any }) => {
      res.status(403).send(err.message);
    });
};

export default userValidate;
