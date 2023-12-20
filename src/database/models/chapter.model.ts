import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for Chapter Document
export interface ChapterDocument extends Document {
  subjectId: string;
  chapterName: string;
  lesson: string[];
}

// Interface for Chapter Model (Static Methods)
interface ChapterModel extends Model<ChapterDocument> {}

const chapterSchema = new Schema<ChapterDocument, ChapterModel>(
  {
    subjectId: {
      type: String,
      required: [true, 'A chapter must have a subject ID'],
      ref: 'courses',
    },
    chapterName: {
      type: String,
      required: [true, 'A chapter must have a name'],
    },
    lesson: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


// for populate the lesson 🐳

// chapterSchema.pre(/^find/, function (this: any, next) {
//   this.populate({
//     path: 'lesson',
//   });

//   next();
// });


const Chapter = mongoose.model<ChapterDocument, ChapterModel>('Chapter', chapterSchema);

export default Chapter;


