import { Request, Response, NextFunction } from 'express';
import ChapterService from '../services/chapter.service';
import asyncHandler from 'express-async-handler';

class ChapterController {
  static getAllChapters = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await ChapterService.getAllChapters();
    res.status(200).json(result);
  });

  static getChapterById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await ChapterService.getChapterById(req.params.chapterId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  static createChapter = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await ChapterService.createChapter(req.body);
    res.status(201).json(result);
  });

  static updateChapterById = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await ChapterService.updateChapterById(req.params.chapterId, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  static deleteChapterById = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await ChapterService.deleteChapterById(req.params.chapterId);
      res.status(204).json(result);
    } catch (error) {
      next(error);
    }
  });
}

export default ChapterController;
