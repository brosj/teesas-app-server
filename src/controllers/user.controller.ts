import { Request, Response, NextFunction } from "express";
import pool from "../database/connection";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { hashPassword } from "../utils/encrypt";

dotenv.config();

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { childName, email, phoneNumber, countryCode, password, grade } =
    req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const insertQuery = `INSERT into "Users" ("childName", email, "phoneNumber", "countryCode", password, grade, "createdAt", "updatedAt")
                        values ('${childName}', '${email}', '${phoneNumber}', '${countryCode}', '${hashedPassword}', '${grade}', (to_timestamp(${Date.now()} / 1000.0)), (to_timestamp(${Date.now()} / 1000.0)))
    `;

    pool.query(insertQuery, async (err: any, result: any) => {
      if (!err) {
        return res.status(201).json({
          status: true,
          message: "learner created successfully",
        });
      } else {
        console.log(err);
        return res.status(500).json({
          status: false,
          message: "An account already exists with this email. Please sign in.",
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const plainPassword = req.body.password;

  const checkEmailQuery = `SELECT "childName", "countryCode", password, "createdAt" FROM "Users" WHERE email='${email}'`;

  pool.query(checkEmailQuery, (err: any, result: any) => {
    if (!err) {
      if (!result.rows[0]) {
        // console.log("User does not exist");
        return res.json({
          status: false,
          message: "Invalid credentials.",
        });
      }

      const { childName, countryCode, password, createdAt } = result.rows[0];

      if (bcrypt.compareSync(plainPassword, password)) {
        const payload = { childName, countryCode, createdAt };
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
    }
  });
};
