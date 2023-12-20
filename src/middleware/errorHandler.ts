// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404, 'fail');
  next(err);
};

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    message: err.message,
  });
};
