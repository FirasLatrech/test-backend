import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../database/models/usersmodel';
import { config } from '../config/config';
import AppError from '../utils/AppError';

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token = req.header('Authorization');
  if (!token) {
    next(new AppError('Unauthorized - No token provided 😅', 401, 'fail'));
    return;
  }
  token = token.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.database.secretToken) as UserDocument;
    // Verify if the user is present in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      next(new AppError('Please verify your token 😅', 400, 'fail'));
      return;
    }
    // Assign the user object to the request for later use
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Unauthorized - Invalid token 😅', 401, 'fail'));
  }
};

export default verifyToken;
