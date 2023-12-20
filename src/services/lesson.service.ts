import { LessonDocument } from '../database/models/lesson.model';
import LessonRepository from '../database/repositories/lesson.reposoitory';
import AppError from '../utils/AppError';

class LessonService {
  static async getAllLessons(): Promise<{ status: string; result: number; data: { lessons: LessonDocument[] } }> {
    const lessons = await LessonRepository.getAllLessons();
    return {
      status: 'success',
      result: lessons.length,
      data: {
        lessons,
      },
    };
  }

  static async getLessonById(lessonId: string): Promise<{ status: string; data: { lesson: LessonDocument } }> {
    const lesson = await LessonRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new AppError('Lesson not found', 404, 'error 👺');
    }
    return {
      status: 'success 😎',
      data: {
        lesson,
      },
    };
  }
  static async createLesson(lessonData: any): Promise<{ status: string; data: { lesson: LessonDocument } }> {
    const newLesson = await LessonRepository.createLesson(lessonData);
    return {
      status: 'success',
      data: {
        lesson: newLesson,
      },
    };
  }

  static async updateLessonById(
    lessonId: string,
    lessonData: any
  ): Promise<{ status: string; data: { lesson: LessonDocument } }> {
    const updatedLesson = await LessonRepository.updateLessonById(lessonId, lessonData);
    if (!updatedLesson) {
      throw new AppError('Lesson not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: {
        lesson: updatedLesson,
      },
    };
  }
  static async deleteLessonById(lessonId: string): Promise<{ status: string; data: null }> {
    await LessonRepository.deleteLessonById(lessonId);
    return {
      status: 'success',
      data: null,
    };
  }
}

export default LessonService;
