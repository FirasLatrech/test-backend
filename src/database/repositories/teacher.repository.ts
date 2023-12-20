import AppError from "../../utils/AppError";
import Teacher, { TeacherDocument } from "../models/teacher.model";


class TeacherRepository {
  static async getAllTeachers(): Promise<TeacherDocument[]> {
    return Teacher.find();
  }

  static async getTeacherById(TeacherId: string): Promise<TeacherDocument | null> {
    return Teacher.findById(TeacherId);
  }

  static async createTeacher(TeacherData: any): Promise<TeacherDocument> {
    return Teacher.create(TeacherData);
  }

  static async updateTeacherById(TeacherId: string, TeacherData: any): Promise<TeacherDocument | null> {
    return Teacher.findByIdAndUpdate(TeacherId, TeacherData, { new: true });
  }

  static async deleteTeacherById(TeacherId: string): Promise<void> {
    const deletedTeacher = await Teacher.findByIdAndDelete(TeacherId);
    if (!deletedTeacher) {
      throw new AppError('Teacher not found', 404, 'error 👺');
    }
  }
}

export default TeacherRepository;
