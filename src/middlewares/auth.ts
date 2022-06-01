import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require('dotenv').config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
      req.user = decoded;
    } catch (error) {
     return res.status(403).json({
       message: 'Invalid token.'
      })
    }
  }
 
  if(!token) {
    return res.status(401).json({
      message: 'Access Denied, No Access Token Provided.'
    });
  }

  next();
}

export default auth;