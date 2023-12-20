import { NextFunction, Request, Response } from 'express';
import Session from '../database/models/session.model';
import SessionController from '../controller/session.controller';
import AppError from '../utils/AppError';


// Mocking the Session model
jest.mock('../database/models/session.model');

describe('SessionController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all sessions', async () => {
    const mockSessions = [{ _id: '1', sessionTitle: 'Session 1' }];
    (Session.find as jest.Mock).mockResolvedValueOnce(mockSessions);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    await SessionController.getAllSessions(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      result: mockSessions.length,
      data: {
        sessions: mockSessions,
      },
    });
  });

  it('should handle errors when getting all sessions', async () => {
    const errorMessage = 'Database error';
    (Session.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await SessionController.getAllSessions(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 500, 'error 👺'));
  });

  it('should get a session by ID', async () => {
    const mockSession = { _id: '1', sessionTitle: 'Session 1' };
    (Session.findById as jest.Mock).mockResolvedValueOnce(mockSession);

    const req = { params: { sessionId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    await SessionController.getSessionById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success 😎',
      data: {
        session: mockSession,
      },
    });
  });

  it('should handle errors when getting a session by ID', async () => {
    const errorMessage = 'Session not found';
    (Session.findById as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { sessionId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await SessionController.getSessionById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should create a session', async () => {
    const req = { body: { sessionTitle: 'New Session' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const newSession = { _id: '2', sessionTitle: 'New Session' };
    (Session.create as jest.Mock).mockResolvedValueOnce(newSession);
    const next = jest.fn() as unknown as NextFunction;

    await SessionController.createSession(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        session: newSession,
      },
    });
  });

  it('should handle errors when creating a session', async () => {
    const errorMessage = 'Invalid session data';
    (Session.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = { body: { sessionTitle: 'New Session' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await SessionController.createSession(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 400, 'error 👺'));
  });

  it('should update a session by ID', async () => {
    const req = { params: { sessionId: '1' }, body: { sessionTitle: 'Updated Session' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const updatedSession = { _id: '1', sessionTitle: 'Updated Session' };
    (Session.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedSession);
    const next = jest.fn() as unknown as NextFunction;

    await SessionController.updateSessionById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        session: updatedSession,
      },
    });
  });

  it('should handle errors when updating a session by ID', async () => {
    const errorMessage = 'Session not found';
    (Session.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { sessionId: '1' }, body: { sessionTitle: 'Updated Session' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await SessionController.updateSessionById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should delete a session by ID', async () => {
    const req = { params: { sessionId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const deletedSession = { _id: '1', sessionTitle: 'Deleted Session' };
    (Session.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedSession);
    const next = jest.fn() as unknown as NextFunction;

    await SessionController.deleteSessionById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should handle errors when deleting a session by ID', async () => {
    const errorMessage = 'Session not found';
    (Session.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { sessionId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await SessionController.deleteSessionById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });
});
