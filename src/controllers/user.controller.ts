import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { hashPassword } from "../utils/encrypt";
import User from "../database/models/user";
import db from "../database/models";

dotenv.config();

// User Sign Up
export const registerUser = async (
  req: Request,
  res: Response
) => {
  const { childName, email, phoneNumber, countryCode, password, grade } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    await User(db.sequelize, db.Sequelize.DataTypes).create({
      childName,
      email,
      phoneNumber,
      countryCode,
      password: hashedPassword,
      grade,
    });
    return res.status(201).json({
      status: true,
      message: "learner created successfully",
    });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "An account already exists with this email. Please sign in.",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An Unexpected Error Occured.",
      });
    }
  }
};

// User Login
export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const plainPassword = req.body.password;

  const user = await User(db.sequelize, db.Sequelize.DataTypes).findOne({ where: { email } });
  if (user) {
    const { childName, email, countryCode, password } = user;

    if (bcrypt.compareSync(plainPassword, password)) {
      const payload = { childName, email, countryCode };
      const privateKey = process.env.JWT_SECRET as string;
      const token = jwt.sign(payload, privateKey, { expiresIn: "1h" });

      return res.status(200).json({
        status: true,
        message: "login successful",
        token,
      });
    } else {
      return res.status(403).json({
        status: false,
        message: "Invalid credentials.",
      });
    }
  } else {
    // console.log("User does not exist");
    return res.status(403).json({
      status: false,
      message: "Invalid credentials.",
    });
  }
};
