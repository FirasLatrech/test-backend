import AppError from "../../utils/AppError";
import Course, { CourseDocument } from "../models/coursemodel";

class CourseRepository {
  static async getAllCourses(): Promise<CourseDocument[]> {
    return Course.find();
  }

  static async getCourseById(CourseId: string): Promise<CourseDocument | null> {
    return Course.findById(CourseId);
  }

  static async createCourse(CourseData: any): Promise<CourseDocument> {
    return Course.create(CourseData);
  }

  static async updateCourseById(CourseId: string, CourseData: any): Promise<CourseDocument | null> {
    return Course.findByIdAndUpdate(CourseId, CourseData, { new: true });
  }

  static async deleteCourseById(CourseId: string): Promise<void> {
    const deletedCourse = await Course.findByIdAndDelete(CourseId);
    if (!deletedCourse) {
      throw new AppError('Course not found', 404, 'error 👺');
    }
  }
}

export default CourseRepository;
