import { Request, Response, NextFunction } from 'express';
import TeacherService from '../services/teacher.service';
import Teacher from '../database/models/teacher.model';
jest.mock('../database/models/teacher.model');

describe('TeacherService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all teachers', async () => {
    const mockTeachers = [{ _id: '1', teacherName: 'Teacher 1' }];
    (Teacher.find as jest.Mock).mockResolvedValueOnce(mockTeachers);

    const result = await TeacherService.getAllTeachers();

    expect(result).toEqual({
      status: 'success',
      result: mockTeachers.length,
      data: {
        teachers: mockTeachers,
      },
    });
  });

  it('should get a teacher by ID', async () => {
    const mockTeacher = { _id: '1', teacherName: 'Teacher 1' };
    (Teacher.findById as jest.Mock).mockResolvedValueOnce(mockTeacher);

    const result = await TeacherService.getTeacherById('1');

    expect(result).toEqual({
      status: 'success 😎',
      data: {
        teacher: mockTeacher,
      },
    });
  });

  it('should create a teacher', async () => {
    const mockTeacherData = { teacherName: 'New Teacher' };
    const createdTeacher = { _id: '2', teacherName: 'New Teacher' };
    (Teacher.create as jest.Mock).mockResolvedValueOnce(createdTeacher);

    const result = await TeacherService.createTeacher(mockTeacherData);

    expect(result).toEqual({
      status: 'success',
      data: {
        teacher: createdTeacher,
      },
    });
  });

  it('should update a teacher by ID', async () => {
    const mockTeacherData = { teacherName: 'Updated Teacher' };
    const updatedTeacher = { _id: '1', teacherName: 'Updated Teacher' };
    (Teacher.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedTeacher);

    const result = await TeacherService.updateTeacherById('1', mockTeacherData);

    expect(result).toEqual({
      status: 'success',
      data: {
        teacher: updatedTeacher,
      },
    });
  });

  it('should delete a Teacher by ID', async () => {
    const req = { params: { TeacherId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const deletedTeacher = { _id: '1', TeacherTitle: 'Deleted Teacher' };
    (Teacher.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedTeacher);
    const next = jest.fn() as unknown as NextFunction;

    // await TeacherController.deleteTeacherById(req, res, next);

    // expect(res.status).toHaveBeenCalledWith(204);
  });
  
});