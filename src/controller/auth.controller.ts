import catchHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import AppError from '../utils/AppError';
import { UserDocument } from '../database/models/usersmodel';
import UserRepository from '../database/repositories/usermodel.repository';

export const register = catchHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, phone, classe } = req.body;
  console.log(req.body)

  try {
    const result = await AuthService.register(name, email, password,phone, classe);

    console.log("🤒",result)
    res.status(201).json({
      status: 'success ✨',
      ...result,
    });
  } catch (error : any) {
    next(error);
  }
});

export const login = catchHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await AuthService.login(email, password);
    res.status(200).json({
      status: 'success ⚡️',
      ...result,
    });
  } catch (error) {
    next(error);
  }
});

export const refreshToken = catchHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { refreshToken } = req.body;

  try {
    const result = await AuthService.refreshToken(refreshToken);
    res.status(200).json({
      status: 'success ⚡️',
      data : {
      ...result
      }
    });
  } catch (error) {
    next(error);
  }
});

export const getMe = catchHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.split(" ")[1];

  if (!token) {
    next(new AppError('Authorization token missing', 401, 'fail'));
    return;
  }

  try {
    const user = await AuthService.getMe(token);
    res.status(200).json({
      status: 'success ⚡️',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
});
export const getAllUser = catchHandler(async (req: Request, res: Response, next: NextFunction) =>{
  const users = await UserRepository.getAllUsers()
  res.status(200).json({
    status: 'success ⚡️',
    data: {
      users,
    },
  });

})
export const updateUser = catchHandler(async (req: Request, res: Response, next: NextFunction) =>{
  const result = await UserRepository.updateUserById(req.params.userId, req.body);
  res.status(200).json(result);
})
export const deletUser = catchHandler(async (req: Request, res: Response, next: NextFunction) =>{
  const result = await UserRepository.deleteUserById(req.params.userId);
  res.status(204).json(result);
})