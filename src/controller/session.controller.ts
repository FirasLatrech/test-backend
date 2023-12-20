import { Request, Response } from 'express';
import SessionService from '../services/session.service';
import catchHandler from 'express-async-handler';

class SessionController {
  static getAllSessions = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await SessionService.getAllSessions();
    res.status(200).json(result);
  });

  static getSessionById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await SessionService.getSessionById(req.params.sessionId);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static createSession = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await SessionService.createSession(req.body);
    res.status(201).json(result);
  });

  static updateSessionById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await SessionService.updateSessionById(req.params.sessionId, req.body);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static deleteSessionById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await SessionService.deleteSessionById(req.params.sessionId);
      res.status(204).json(result);
    } catch (error) {
      throw error;
    }
  });
}

export default SessionController;
