import { NextFunction, Request, Response } from 'express';
import Magazine from '../database/models/magazine.model';

import AppError from '../utils/AppError';
import MagazineController from '../controller/magazine.controller';

// Mocking the Magazine model
jest.mock('../database/models/magazine.model');

describe('MagazineController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all magazines', async () => {
    const mockMagazines = [{ _id: '1', magazineTitle: 'Magazine 1' }];
    (Magazine.find as jest.Mock).mockResolvedValueOnce(mockMagazines);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.getAllMagazines(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      result: mockMagazines.length,
      data: {
        magazines: mockMagazines,
      },
    });
  });

  it('should handle errors when getting all magazines', async () => {
    const errorMessage = 'Database error';
    (Magazine.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.getAllMagazines(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 500, 'error 👺'));
  });

  it('should get a magazine by ID', async () => {
    const mockMagazine = { _id: '1', magazineTitle: 'Magazine 1' };
    (Magazine.findById as jest.Mock).mockResolvedValueOnce(mockMagazine);

    const req = { params: { magazineId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.getMagazineById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success 😎',
      data: {
        magazine: mockMagazine,
      },
    });
  });

  it('should handle errors when getting a magazine by ID', async () => {
    const errorMessage = 'Magazine not found';
    (Magazine.findById as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { magazineId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.getMagazineById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should create a magazine', async () => {
    const req = { body: { magazineTitle: 'New Magazine' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const newMagazine = { _id: '2', magazineTitle: 'New Magazine' };
    (Magazine.create as jest.Mock).mockResolvedValueOnce(newMagazine);
    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.createMagazine(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        magazine: newMagazine,
      },
    });
  });

  it('should handle errors when creating a magazine', async () => {
    const errorMessage = 'Invalid magazine data';
    (Magazine.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = { body: { magazineTitle: 'New Magazine' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.createMagazine(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 400, 'error 👺'));
  });

  it('should update a magazine by ID', async () => {
    const req = { params: { magazineId: '1' }, body: { magazineTitle: 'Updated Magazine' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const updatedMagazine = { _id: '1', magazineTitle: 'Updated Magazine' };
    (Magazine.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedMagazine);
    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.updateMagazineById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        magazine: updatedMagazine,
      },
    });
  });

  it('should handle errors when updating a magazine by ID', async () => {
    const errorMessage = 'Magazine not found';
    (Magazine.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { magazineId: '1' }, body: { magazineTitle: 'Updated Magazine' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.updateMagazineById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should delete a magazine by ID', async () => {
    const req = { params: { magazineId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const deletedMagazine = { _id: '1', magazineTitle: 'Deleted Magazine' };
    (Magazine.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedMagazine);
    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.deleteMagazineById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should handle errors when deleting a magazine by ID', async () => {
    const errorMessage = 'Magazine not found';
    (Magazine.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { magazineId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await MagazineController.deleteMagazineById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });
});
