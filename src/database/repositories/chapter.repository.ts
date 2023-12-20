import mongoose from 'mongoose';
import Chapter from '../models/chapter.model';




class ChapterRepository {
  // Get all chapters
  static async getAllChapters() {
    const chapters = await Chapter.find().populate('lesson');
    return chapters;
  }

  // Get a chapter by ID
  static async getChapterById(chapterId: string) {
    const chapter = await Chapter.findById(chapterId).populate('lesson');
    return chapter;
  }

  // Create a new chapter
  static async createChapter(chapterData: any) {
    const newChapter = await Chapter.create(chapterData);
    return newChapter;
  }

  // Update a chapter by ID
  static async updateChapterById(chapterId: string, chapterData: any) {
    const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, chapterData, { new: true }).populate('lesson');
    return updatedChapter;
  }

  // Delete a chapter by ID
  static async deleteChapterById(chapterId: string) {
    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
    return deletedChapter;
  }
}

export default ChapterRepository;
