import { Request, Response } from 'express';
import UserRoleService from '../services/user_role.service';
import catchHandler from 'express-async-handler';

class UserRoleController {
  static getAllUserRoles = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await UserRoleService.getAllUserRoles();
    res.status(200).json(result);
  });

  static getUserRoleById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await UserRoleService.getUserRoleById(req.params.userRoleId);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static createUserRole = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await UserRoleService.createUserRole(req.body);
    res.status(201).json(result);
  });

  static updateUserRoleById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await UserRoleService.updateUserRoleById(req.params.userRoleId, req.body);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static deleteUserRoleById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await UserRoleService.deleteUserRoleById(req.params.userRoleId);
      res.status(204).json(result);
    } catch (error) {
      throw error;
    }
  });
}

export default UserRoleController;
