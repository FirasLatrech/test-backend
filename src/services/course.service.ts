import Course from '../database/repositories/course.repository';
import AppError from '../utils/AppError';

class CourseService {
  static async getAllCourses() {
    const courses = await Course.getAllCourses();
    return {
      status: 'success',
      result: courses.length,
      data: {
        courses,
      },
    };
  }

  static async getCourseById(courseId: string) {
    const course = await Course.getCourseById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404, 'error 👺');
    }
    return {
      status: 'success 😎',
      data: {
        course,
      },
    };
  }

  static async createCourse(courseData: any) {
    const newCourse = await Course.createCourse(courseData);
    return {
      status: 'success',
      data: {
        newCourse,
      },
    };
  }

  static async updateCourseById(courseId: string, courseData: any) {
    const updatedCourse = await Course.updateCourseById(courseId, courseData);
    if (!updatedCourse) {
      throw new AppError('Course not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: {
        course: updatedCourse,
      },
    };
  }

  static async deleteCourseById(courseId: string) {
     await Course.deleteCourseById(courseId);
    return {
      status: 'success',
      data: null,
    };
  }
}

export default CourseService;
