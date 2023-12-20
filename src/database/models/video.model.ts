// models/video.model.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface VideoDocument extends Document {
  sessionId: string;
  subject: string;
  videoUrl: string;
}

interface VideoModel extends Model<VideoDocument> {}

const videoSchema = new Schema<VideoDocument, VideoModel>(
  {
    sessionId: {
      type: String,
      required: [true, 'A video must have a session ID'],
    },
    subject: {
      type: String,
      required: [true, 'A video must have a subject'],
    },
    videoUrl: {
      type: String,
      required: [true, 'A video must have a URL'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Video = mongoose.model<VideoDocument, VideoModel>('Video', videoSchema);

export default Video;
