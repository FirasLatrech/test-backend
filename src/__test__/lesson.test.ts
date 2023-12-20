// import LessonRepository from '../database/repositories/lesson.reposoitory';
// import LessonService from '../services/lesson.service';
// import AppError from '../utils/AppError';

// jest.mock('../database/repositories/lesson.reposoitory');

// describe('LessonService', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should get all lessons', async () => {
//     const mockLessons = [{ _id: '1', lessonName: 'Lesson 1' }];
//     (LessonRepository.getAllLessons as jest.Mock).mockResolvedValueOnce(mockLessons);

//     const result = await LessonService.getAllLessons();

//     expect(result).toEqual({
//       status: 'success',
//       result: mockLessons.length,
//       data: {
//         lessons: mockLessons,
//       },
//     });
//   });

//   it('should get a lesson by ID', async () => {
//     const mockLesson = { _id: '1', lessonName: 'Lesson 1' };
//     (LessonRepository.getLessonById as jest.Mock).mockResolvedValueOnce(mockLesson);

//     const result = await LessonService.getLessonById('1');

//     expect(result).toEqual({
//       status: 'success 😎',
//       data: {
//         lesson: mockLesson,
//       },
//     });
//   });

//   it('should create a lesson', async () => {
//     const lessonData = { lessonName: 'New Lesson' };
//     const newLesson = { _id: '2', lessonName: 'New Lesson' };
//     (LessonRepository.createLesson as jest.Mock).mockResolvedValueOnce(newLesson);

//     const result = await LessonService.createLesson(lessonData);

//     expect(result).toEqual({
//       status: 'success',
//       data: {
//         lesson: newLesson,
//       },
//     });
//   });

//   it('should update a lesson by ID', async () => {
//     const lessonId = '1';
//     const lessonData = { lessonName: 'Updated Lesson' };
//     const updatedLesson = { _id: '1', lessonName: 'Updated Lesson' };
//     (LessonRepository.updateLessonById as jest.Mock).mockResolvedValueOnce(updatedLesson);

//     const result = await LessonService.updateLessonById(lessonId, lessonData);

//     expect(result).toEqual({
//       status: 'success',
//       data: {
//         lesson: updatedLesson,
//       },
//     });
//   });

//   it('should throw an error when updating a non-existent lesson', async () => {
//     const lessonId = 'nonexistentId';
//     const lessonData = { lessonName: 'Updated Lesson' };
//     (LessonRepository.updateLessonById as jest.Mock).mockResolvedValueOnce(null);

//     await expect(LessonService.updateLessonById(lessonId, lessonData)).rejects.toThrow(
//       new AppError('Lesson not found', 404, 'error 👺')
//     );
//   });

//   it('should delete a lesson by ID', async () => {
//     const lessonId = '1';
//     (LessonRepository.deleteLessonById as jest.Mock).mockResolvedValueOnce(undefined);

//     const result = await LessonService.deleteLessonById(lessonId);

//     expect(result).toEqual({
//       status: 'success',
//       data: null,
//     });
//   });
// });
import { NextFunction, Request, Response } from 'express';
import Lesson from '../database/models/lesson.model';
import LessonController from '../controller/lesson.controller';
import AppError from '../utils/AppError';

// Mocking the Lesson model
jest.mock('../database/models/lesson.model');

describe('LessonController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all lessons', async () => {
    const mockLessons = [{ _id: '1', lessonTitle: 'Lesson 1' }];
    (Lesson.find as jest.Mock).mockResolvedValueOnce(mockLessons);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    await LessonController.getAllLessons(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      result: mockLessons.length,
      data: {
        lessons: mockLessons,
      },
    });
  });

  it('should handle errors when getting all lessons', async () => {
    const errorMessage = 'Database error';
    (Lesson.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await LessonController.getAllLessons(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 500, 'error 👺'));
  });

  it('should get a lesson by ID', async () => {
    const mockLesson = { _id: '1', lessonTitle: 'Lesson 1' };
    (Lesson.findById as jest.Mock).mockResolvedValueOnce(mockLesson);

    const req = { params: { lessonId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    await LessonController.getLessonById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success 😎',
      data: {
        lesson: mockLesson,
      },
    });
  });

  it('should handle errors when getting a lesson by ID', async () => {
    const errorMessage = 'Lesson not found';
    (Lesson.findById as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { lessonId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await LessonController.getLessonById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should create a lesson', async () => {
    const req = { body: { lessonTitle: 'New Lesson' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const newLesson = { _id: '2', lessonTitle: 'New Lesson' };
    (Lesson.create as jest.Mock).mockResolvedValueOnce(newLesson);
    const next = jest.fn() as unknown as NextFunction;

    await LessonController.createLesson(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        lesson: newLesson,
      },
    });
  });

  it('should handle errors when creating a lesson', async () => {
    const errorMessage = 'Invalid lesson data';
    (Lesson.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = { body: { lessonTitle: 'New Lesson' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await LessonController.createLesson(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 400, 'error 👺'));
  });

  it('should update a lesson by ID', async () => {
    const req = { params: { lessonId: '1' }, body: { lessonTitle: 'Updated Lesson' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const updatedLesson = { _id: '1', lessonTitle: 'Updated Lesson' };
    (Lesson.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedLesson);
    const next = jest.fn() as unknown as NextFunction;

    await LessonController.updateLessonById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        lesson: updatedLesson,
      },
    });
  });

  it('should handle errors when updating a lesson by ID', async () => {
    const errorMessage = 'Lesson not found';
    (Lesson.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { lessonId: '1' }, body: { lessonTitle: 'Updated Lesson' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await LessonController.updateLessonById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should delete a lesson by ID', async () => {
    const req = { params: { lessonId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const deletedLesson = { _id: '1', lessonTitle: 'Deleted Lesson' };
    (Lesson.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedLesson);
    const next = jest.fn() as unknown as NextFunction;

    await LessonController.deleteLessonById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should handle errors when deleting a lesson by ID', async () => {
    const errorMessage = 'Lesson not found';
    (Lesson.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { lessonId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await LessonController.deleteLessonById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });
});
