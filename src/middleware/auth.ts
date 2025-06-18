import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

interface CustomRequest extends Request {
  user?: { username: string };
}

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
 const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
 if (!token) return res.sendStatus(401);
 

 try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET!);
   console.log(decoded);
   // (req as CustomRequest).user = decoded;
   next();
 } catch {
   res.sendStatus(403);
 }
};