import { Request, Response } from 'express';
import TeacherService from '../services/teacher.service';
import catchHandler from 'express-async-handler';

class TeacherController {
  static getAllTeachers = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await TeacherService.getAllTeachers();
    res.status(200).json(result);
  });

  static getTeacherById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await TeacherService.getTeacherById(req.params.teacherId);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static createTeacher = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await TeacherService.createTeacher(req.body);
    res.status(201).json(result);
  });

  static updateTeacherById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await TeacherService.updateTeacherById(req.params.teacherId, req.body);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static deleteTeacherById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await TeacherService.deleteTeacherById(req.params.teacherId);
      res.status(204).json(result);
    } catch (error) {
      throw error;
    }
  });
}

export default TeacherController;
