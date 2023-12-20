import mongoose, { Document, Schema, Model } from 'mongoose';
import CourseRepository from '../repositories/course.repository';

// Interface for Course Document
export interface CourseDocument extends Document {
  userId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  categoryId?: string;
  category?: CategoryDocument;
  chapters: ChapterDocument[];
  attachments: AttachmentDocument[];
  purchases: PurchaseDocument[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Course Model (Static Methods)
interface CourseModel extends Model<CourseDocument> {}

// Interface for Category Document
interface CategoryDocument extends Document {
  // Define the properties for the Category document
}

// Interface for Chapter Document
interface ChapterDocument extends Document {
  // Define the properties for the Chapter document
}

// Interface for Attachment Document
interface AttachmentDocument extends Document {
  // Define the properties for the Attachment document
}

// Interface for Purchase Document
interface PurchaseDocument extends Document {
  // Define the properties for the Purchase document
}

// Course Schema
const courseSchema = new Schema<CourseDocument, CourseModel>(
  {
    userId: {
      type: String,
      required: [true, 'A course must have a user ID'],
    },
    title: {
      type: String,
      required: [true, 'A course must have a title'],
    },
    description: String,
    imageUrl: String,
    price: Number,
    isPublished: {
      type: Boolean,
      default: false,
    },
    categoryId: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Chapter',
      },
    ],
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Attachment',
      },
    ],
    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Purchase',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    // -------------------------- Options --------------------------
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// -------------------------- Model --------------------------

// this for populate the chapter 
// courseSchema.pre(/^find/, function (this: any, next) {
//   this.populate({
//     path: 'chapters',
//   });

//   next();
// });

// -------------------------- Model --------------------------
// Course Model
const Course = mongoose.model<CourseDocument, CourseModel>('Course', courseSchema);

export default Course;
