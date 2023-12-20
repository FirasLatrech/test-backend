import AppError from "../../utils/AppError";
import Session, { SessionDocument } from "../models/session.model";


class SessionRepository {
  static async getAllSessions(): Promise<SessionDocument[]> {
    return Session.find();
  }

  static async getSessionById(SessionId: string): Promise<SessionDocument | null> {
    return Session.findById(SessionId);
  }

  static async createSession(SessionData: any): Promise<SessionDocument> {
    return Session.create(SessionData);
  }

  static async updateSessionById(SessionId: string, SessionData: any): Promise<SessionDocument | null> {
    return Session.findByIdAndUpdate(SessionId, SessionData, { new: true });
  }

  static async deleteSessionById(SessionId: string): Promise<void> {
    const deletedSession = await Session.findByIdAndDelete(SessionId);
    if (!deletedSession) {
      throw new AppError('Session not found', 404, 'error 👺');
    }
  }
}

export default SessionRepository;
