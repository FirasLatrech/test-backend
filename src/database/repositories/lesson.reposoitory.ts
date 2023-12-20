import AppError from "../../utils/AppError";
import Lesson from "../models/lesson.model";

class LessonRepository {
  static async getAllLessons() {
    const lessons = await Lesson.find();
    return lessons;
  }

  static async getLessonById(lessonId: string) {
    const lesson = await Lesson.findById(lessonId);
    return lesson;
  }

  static async createLesson(lessonData: any) {
    const newLesson = await Lesson.create(lessonData);
    return newLesson;
  }

  static async updateLessonById(lessonId: string, lessonData: any) {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      lessonData,
      { new: true }
    );
    return updatedLesson;
  }

  static async deleteLessonById(lessonId: string) {
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
      throw new AppError('Lesson not found', 404, 'error 👺');
    }
    return deletedLesson;
  }
}

export default LessonRepository;
