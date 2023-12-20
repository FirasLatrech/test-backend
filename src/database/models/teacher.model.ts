// models/teacher.model.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TeacherDocument extends Document {
  userId: string;
  subject: string;
  teacherName:String
  classesTaught: string[];
}

interface TeacherModel extends Model<TeacherDocument> {}

const teacherSchema = new Schema<TeacherDocument, TeacherModel>(
  {
    userId: {
      type: String,
      required: [true, 'A teacher must have a user ID'],
    },
    subject: {
      type: String,
      required: [true, 'A teacher must have a subject'],
    },
    teacherName:{
      type:String

    },
    classesTaught: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Teacher = mongoose.model<TeacherDocument, TeacherModel>('Teacher', teacherSchema);

export default Teacher;