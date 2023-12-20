import AppError from "../../utils/AppError";
import User, { UserDocument } from "../models/usersmodel";


class UserRepository {
  static async getAllUsers(): Promise<UserDocument[]> {
    return User.find();
  }

  static async getUserById(UserId: string): Promise<UserDocument | null> {
    return User.findById(UserId);
  }

  static async createUser(UserData: any): Promise<UserDocument> {
    return User.create(UserData);
  }

  static async updateUserById(UserId: string, UserData: any): Promise<UserDocument | null> {
    return User.findByIdAndUpdate(UserId, UserData, { new: true });
  }

  static async deleteUserById(UserId: string): Promise<void> {
    const deletedUser = await User.findByIdAndDelete(UserId);
    if (!deletedUser) {
      throw new AppError('User not found', 404, 'error 👺');
    }
  }
}

export default UserRepository;
