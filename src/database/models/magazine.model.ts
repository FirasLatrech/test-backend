// models/magazine.model.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface MagazineDocument extends Document {
  lessonId: string;
  magazineUrl: string;
}

interface MagazineModel extends Model<MagazineDocument> {}

const magazineSchema = new Schema<MagazineDocument, MagazineModel>(
  {
    lessonId: {
      type: String,
      required: [true, 'A magazine must have a lesson ID'],
    },
    magazineUrl: {
      type: String,
      required: [true, 'A magazine must have a URL'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Magazine = mongoose.model<MagazineDocument, MagazineModel>('Magazine', magazineSchema);

export default Magazine;


