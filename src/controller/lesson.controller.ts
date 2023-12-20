import { Request, Response } from 'express';
import LessonService from '../services/lesson.service';
import catchHandler from 'express-async-handler';

class LessonController {
  static getAllLessons = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await LessonService.getAllLessons();
    res.status(200).json(result);
  });

  static getLessonById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await LessonService.getLessonById(req.params.lessonId);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static createLesson = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await LessonService.createLesson(req.body);
    res.status(201).json(result);
  });

  static updateLessonById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await LessonService.updateLessonById(req.params.lessonId, req.body);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static deleteLessonById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await LessonService.deleteLessonById(req.params.lessonId);
      res.status(204).json(result);
    } catch (error) {
      throw error;
    }
  });
}

export default LessonController;
