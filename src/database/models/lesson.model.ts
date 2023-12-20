import mongoose, { Document, Schema, Model } from 'mongoose';
import LessonRepository from '../repositories/lesson.reposoitory';

export interface LessonDocument extends Document {
  chapterId: string;
  lessonName: string;
  content: string;
  commentCount: number;
  likeCount: number;
}

interface LessonModel extends Model<LessonDocument> {}

const lessonSchema = new Schema<LessonDocument, LessonModel>(
  {
    chapterId: {
      type: String,
      required: [true, 'A lesson must have a chapter ID'],
    },
    lessonName: {
      type: String,
      required: [true, 'A lesson must have a name'],
    },
    content: {
      type: String,
      required: [true, 'A lesson must have content'],
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// -------------------------- Model --------------------------

const Lesson = mongoose.model<LessonDocument, LessonModel>('Lesson', lessonSchema);

export default Lesson;
