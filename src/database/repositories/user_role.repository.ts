import AppError from "../../utils/AppError";
import User_Role, { User_RoleDocument } from "../models/user_role.model";


class User_RoleRepository {
  static async getAllUser_Roles(): Promise<User_RoleDocument[]> {
    return User_Role.find();
  }

  static async getUser_RoleById(User_RoleId: string): Promise<User_RoleDocument | null> {
    return User_Role.findById(User_RoleId);
  }

  static async createUser_Role(User_RoleData: any): Promise<User_RoleDocument> {
    return User_Role.create(User_RoleData);
  }

  static async updateUser_RoleById(User_RoleId: string, User_RoleData: any): Promise<User_RoleDocument | null> {
    return User_Role.findByIdAndUpdate(User_RoleId, User_RoleData, { new: true });
  }

  static async deleteUser_RoleById(User_RoleId: string): Promise<void> {
    const deletedUser_Role = await User_Role.findByIdAndDelete(User_RoleId);
    if (!deletedUser_Role) {
      throw new AppError('User_Role not found', 404, 'error 👺');
    }
  }
}

export default User_RoleRepository;
