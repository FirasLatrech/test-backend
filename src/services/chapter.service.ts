import Chapter from '../database/repositories/chapter.repository';
import AppError from '../utils/AppError';

class ChapterService {
  static async getAllChapters() {
    const chapters = await Chapter.getAllChapters();
    return {
      status: 'success',
      result: chapters.length,
      data: {
        chapters,
      },
    };
  }

  static async getChapterById(chapterId: string) {
    const chapter = await Chapter.getChapterById(chapterId)
    if (!chapter) {
      throw new AppError('Chapter not found', 404, 'error 👺');
    }
    return {
      status: 'success 😎',
      data: {
        chapter,
      },
    };
  }

  static async createChapter(chapterData: any) {
    const createdChapter = await Chapter.createChapter(chapterData);
    return {
      status: 'success',
      data: {
        chapter: createdChapter,
      },
    };
  }

  static async updateChapterById(chapterId: string, chapterData: any) {
    const updatedChapter = await Chapter.updateChapterById(chapterId, chapterData);
    if (!updatedChapter) {
      throw new AppError('Chapter not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: {
        chapter: updatedChapter,
      },
    };
  }

  static async deleteChapterById(chapterId: string) {
     await Chapter.deleteChapterById(chapterId);
    return {
      status: 'success',
      data: null,
    };
  }
}

export default ChapterService;
