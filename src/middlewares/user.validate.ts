import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Validate signup endpoint input fields
const registerSchema = Joi.object({
  childName: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({ "string.empty": "Name cannot be empty." }),
  email: Joi.string()
    .email()
    .min(12)
    .max(50)
    .required()
    .messages({ "string.empty": "Email cannot be empty." }),
  phoneNumber: Joi.number()
    .required(),
  countryCode: Joi.number()
    .required(),
  password: Joi.string().min(7).max(100).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 7 characters long",
    "string.max": "Password must not be more than 100 characters long",
  }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "Passwords do not match." }),
  grade: Joi.string()
    .required()
    .messages({ "string.empty": "Grade is required." }),
});

// Validate login endpoint input fields
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(12)
    .max(50)
    .messages({ "string.empty": "Email cannot be empty." })
    .required(),
  password: Joi.string()
    .min(7)
    .max(100)
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 7 characters long",
    "string.max": "Password must not be more than 100 characters long",
    })
    .required(),
});

export const signupValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  registerSchema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err: { message: any }) => {
      res.status(403).send(err.message);
    });
};

export const loginValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loginSchema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err: { message: any }) => {
      res.status(403).send(err.message);
    });
};
