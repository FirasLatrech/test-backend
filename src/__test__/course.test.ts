import { Request, Response, NextFunction } from 'express';
import CourseController from '../controller/course.controller';
import Course from '../database/models/coursemodel';
import AppError from '../utils/AppError';

jest.mock('../database/models/coursemodel');


describe('CourseController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all courses', async () => {
    const mockCourses = [{ _id: '1', title: 'Course 1' }];
    (Course.find as jest.Mock).mockResolvedValueOnce(mockCourses);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    await CourseController.getAllCourses(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      result: mockCourses.length,
      data: {
        courses: mockCourses,
      },
    });
  });

  it('should handle errors when getting all courses', async () => {
    const errorMessage = 'Database error';
    (Course.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CourseController.getAllCourses(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 500, 'error 👺'));
  });

  it('should get a course by ID', async () => {
    const mockCourse = { _id: '1', title: 'Course 1' };
    (Course.findById as jest.Mock).mockResolvedValueOnce(mockCourse);

    const req = { params: { courseId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    await CourseController.getCourseById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success 😎',
      data: {
        course: mockCourse,
      },
    });
  });

  it('should handle errors when getting a course by ID', async () => {
    const errorMessage = 'Course not found';
    (Course.findById as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { courseId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CourseController.getCourseById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should create a course', async () => {
    const req = { body: { title: 'New Course' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    const createdCourse = { _id: '2', title: 'New Course' };
    (Course.create as jest.Mock).mockResolvedValueOnce(createdCourse);
    const next = jest.fn() as unknown as NextFunction;
  
    await CourseController.createCourse(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        newCourse: createdCourse, // Update key to newCourse
      },
    });
  });
  

  it('should handle errors when creating a course', async () => {
    const errorMessage = 'Invalid course data';
    (Course.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = { body: { title: 'New Course' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CourseController.createCourse(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 400, 'error 👺'));
  });

  it('should update a course by ID', async () => {
    const req = { params: { courseId: '1' }, body: { title: 'Updated Course' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const updatedCourse = { _id: '1', title: 'Updated Course' };
    (Course.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedCourse);
    const next = jest.fn() as unknown as NextFunction;

    await CourseController.updateCourseById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        course: updatedCourse,
      },
    });
  });

  it('should handle errors when updating a course by ID', async () => {
    const errorMessage = 'Course not found';
    (Course.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { courseId: '1' }, body: { title: 'Updated Course' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CourseController.updateCourseById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should delete a course by ID', async () => {
    const req = { params: { courseId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const deletedCourse = { _id: '1', title: 'Deleted Course' };
    (Course.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedCourse);
    const next = jest.fn() as unknown as NextFunction;

    await CourseController.deleteCourseById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should handle errors when deleting a course by ID', async () => {
    const errorMessage = 'Course not found';
    (Course.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { courseId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CourseController.deleteCourseById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });
});
