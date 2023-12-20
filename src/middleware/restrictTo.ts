

import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import { UserDocument } from '../database/models/usersmodel';

type AuthenticatedUser = UserDocument | any;

const restrictToRole = (role:string[]) => {
  return (req: Request & { user?: AuthenticatedUser }, res: Response, next: NextFunction) => {
    // Assuming that you store the user's role in req.user.role
    const userRole = req.user?.role;
    if (!role.includes(userRole)){
      return next(new AppError('Unauthorized. Insufficient role. 😅', 403, 'Forbidden 🚨'))

    }

    // If the user has the required role, continue to the next middleware or route handler
    next();
  };
};

export default restrictToRole;
