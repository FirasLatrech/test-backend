import User_Role from '../database/repositories/user_role.repository';
import AppError from '../utils/AppError';

class UserRoleService {
  static async getAllUserRoles() {
    const userRoles = await User_Role.getAllUser_Roles();
    return {
      status: 'success',
      result: userRoles.length,
      data: {
        userRoles,
      },
    };
  }

  static async getUserRoleById(userRoleId: string) {
    const userRole = await User_Role.getUser_RoleById(userRoleId);
    if (!userRole) {
      throw new AppError('User_Role not found', 404, 'error 👺');
    }
    return {
      status: 'success 😎',
      data: {
        userRole,
      },
    };
  }

  static async createUserRole(userRoleData: any) {
    const newUserRole = await User_Role.createUser_Role(userRoleData);
    return {
      status: 'success',
      data: {
        userRole: newUserRole,
      },
    };
  }

  static async updateUserRoleById(userRoleId: string, userRoleData: any) {
    const updatedUserRole = await User_Role.updateUser_RoleById(userRoleId, userRoleData);
    if (!updatedUserRole) {
      throw new AppError('User_Role not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: {
        userRole: updatedUserRole,
      },
    };
  }

  static async deleteUserRoleById(userRoleId: string) {
    await User_Role.deleteUser_RoleById(userRoleId);
    return {
      status: 'success',
      data: null,
    };
  }
}

export default UserRoleService;
