import Session from '../database/repositories/session.repository';
import AppError from '../utils/AppError';

class SessionService {
  static async getAllSessions() {
    const sessions = await Session.getAllSessions();
    return {
      status: 'success',
      result: sessions.length,
      data: {
        sessions,
      },
    };
  }

  static async getSessionById(sessionId: string) {
    const session = await Session.getSessionById(sessionId);
    if (!session) {
      throw new AppError('Session not found', 404, 'error 👺');
    }
    return {
      status: 'success 😎',
      data: {
        session,
      },
    };
  }

  static async createSession(sessionData: any) {
    const newSession = await Session.createSession(sessionData);
    return {
      status: 'success',
      data: {
        session: newSession,
      },
    };
  }

  static async updateSessionById(sessionId: string, sessionData: any) {
    const updatedSession = await Session.updateSessionById(sessionId, sessionData);
    if (!updatedSession) {
      throw new AppError('Session not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: {
        session: updatedSession,
      },
    };
  }

  static async deleteSessionById(sessionId: string) {
    const deletedSession = await Session.deleteSessionById(sessionId);
    
    return {
      status: 'success',
      data: null,
    };
  }
}

export default SessionService;
