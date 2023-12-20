import mongoose, { Document, Schema, Model } from 'mongoose';

interface CommentDocument extends Document {
  lessonId: string;
  userId: string;
  commentText: string;
  likes: number;
}

interface CommentModel extends Model<CommentDocument> {}

const commentSchema = new Schema<CommentDocument, CommentModel>(
  {
    lessonId: {
      type: String,
      required: [true, 'A comment must have a lesson ID'],
    },
    userId: {
      type: String,
      required: [true, 'A comment must have a user ID'],
    },
    commentText: {
      type: String,
      required: [true, 'A comment must have text'],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model<CommentDocument, CommentModel>('Comment', commentSchema);

export default Comment;
