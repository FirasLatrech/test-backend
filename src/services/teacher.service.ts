import Teacher from '../database/repositories/teacher.repository';
import AppError from '../utils/AppError';

class TeacherService {
  static async getAllTeachers() {
    const teachers = await Teacher.getAllTeachers();
    return {
      status: 'success',
      result: teachers.length,
      data: {
        teachers,
      },
    };
  }

  static async getTeacherById(teacherId: string) {
    const teacher = await Teacher.getTeacherById(teacherId);
    if (!teacher) {
      throw new AppError('Teacher not found', 404, 'error 👺');
    }
    return {
      status: 'success 😎',
      data: {
        teacher,
      },
    };
  }

  static async createTeacher(teacherData: any) {
    const newTeacher = await Teacher.createTeacher(teacherData);
    return {
      status: 'success',
      data: {
        teacher: newTeacher,
      },
    };
  }

  static async updateTeacherById(teacherId: string, teacherData: any) {
    const updatedTeacher = await Teacher.updateTeacherById(teacherId, teacherData);
    if (!updatedTeacher) {
      throw new AppError('Teacher not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: {
        teacher: updatedTeacher,
      },
    };
  }

  static async deleteTeacherById(teacherId: string) {
     await Teacher.deleteTeacherById(teacherId);
  
    return {
      status: 'success',
      data: null,
    };
  }
}
export default TeacherService;
