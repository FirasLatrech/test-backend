// models/session.model.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface SessionDocument extends Document {
  teacherId: string;
  sessionName: string;
  sessionAbout: string;
  sessionPrice: number;
  sessionClass: string;
  date: Date;
}

interface SessionModel extends Model<SessionDocument> {}

const sessionSchema = new Schema<SessionDocument, SessionModel>(
  {
    teacherId: {
      type: String,
      required: [true, 'A session must have a teacher ID'],
    },
    sessionName: {
      type: String,
      required: [true, 'A session must have a name'],
    },
    sessionAbout: String,
    sessionPrice: Number,
    sessionClass: String,
    date: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Session = mongoose.model<SessionDocument, SessionModel>('Session', sessionSchema);

export default Session;
