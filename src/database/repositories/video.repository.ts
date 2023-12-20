import AppError from "../../utils/AppError";
import Video, { VideoDocument } from "../models/video.model";


class VideoRepository {
  static async getAllVideos(): Promise<VideoDocument[]> {
    return Video.find();
  }

  static async getVideoById(VideoId: string): Promise<VideoDocument | null> {
    return Video.findById(VideoId);
  }

  static async createVideo(VideoData: any): Promise<VideoDocument> {
    return Video.create(VideoData);
  }

  static async updateVideoById(VideoId: string, VideoData: any): Promise<VideoDocument | null> {
    return Video.findByIdAndUpdate(VideoId, VideoData, { new: true });
  }

  static async deleteVideoById(VideoId: string): Promise<void> {
    const deletedVideo = await Video.findByIdAndDelete(VideoId);
    if (!deletedVideo) {
      throw new AppError('Video not found', 404, 'error 👺');
    }
  }
}

export default VideoRepository;
