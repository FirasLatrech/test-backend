import { NextFunction, Request, Response } from 'express';
import CourseService from '../services/course.service';
import asyncHandler from 'express-async-handler';

class CourseController {
  static getAllCourses = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await CourseService.getAllCourses();
    res.status(200).json(result);
  });

  static getCourseById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await CourseService.getCourseById(req.params.courseId);
      res.status(200).json(result);
    } catch (error) {
      throw error; // You can also handle errors here if needed
    }
  });

  static createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await CourseService.createCourse(req.body);
    res.status(201).json(result);
  });

  static updateCourseById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await CourseService.updateCourseById(req.params.courseId, req.body);
      res.status(200).json(result);
    } catch (error) {
      throw error; // You can also handle errors here if needed
    }
  });

  static deleteCourseById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await CourseService.deleteCourseById(req.params.courseId);
      res.status(204).json(result);
    } catch (error) {
      throw error; // You can also handle errors here if needed
    }
  });
}

export default CourseController;
