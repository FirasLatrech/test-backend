import UserRoleService from '../services/user_role.service';
import UserRoleRepository from '../database/repositories/user_role.repository';
import AppError from '../utils/AppError';

jest.mock('../database/repositories/user_role.repository');

describe('UserRoleService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all user roles', async () => {
    const mockUserRoles = [{ _id: '1', roleName: 'Role 1' }];
    (UserRoleRepository.getAllUser_Roles as jest.Mock).mockResolvedValueOnce(mockUserRoles);

    const result = await UserRoleService.getAllUserRoles();

    expect(result).toEqual({
      status: 'success',
      result: mockUserRoles.length,
      data: {
        userRoles: mockUserRoles,
      },
    });
  });

  it('should get a user role by ID', async () => {
    const mockUserRole = { _id: '1', roleName: 'Role 1' };
    (UserRoleRepository.getUser_RoleById as jest.Mock).mockResolvedValueOnce(mockUserRole);

    const result = await UserRoleService.getUserRoleById('1');

    expect(result).toEqual({
      status: 'success 😎',
      data: {
        userRole: mockUserRole,
      },
    });
  });

  it('should create a user role', async () => {
    const mockUserRoleData = { roleName: 'New Role' };
    const createdUserRole = { _id: '2', roleName: 'New Role' };
    (UserRoleRepository.createUser_Role as jest.Mock).mockResolvedValueOnce(createdUserRole);

    const result = await UserRoleService.createUserRole(mockUserRoleData);

    expect(result).toEqual({
      status: 'success',
      data: {
        userRole: createdUserRole,
      },
    });
  });

  it('should update a user role by ID', async () => {
    const mockUserRoleData = { roleName: 'Updated Role' };
    const updatedUserRole = { _id: '1', roleName: 'Updated Role' };
    (UserRoleRepository.updateUser_RoleById as jest.Mock).mockResolvedValueOnce(updatedUserRole);

    const result = await UserRoleService.updateUserRoleById('1', mockUserRoleData);

    expect(result).toEqual({
      status: 'success',
      data: {
        userRole: updatedUserRole,
      },
    });
  });

  it('should delete a user role by ID', async () => {
    const result = await UserRoleService.deleteUserRoleById('1');

    expect(result).toEqual({
      status: 'success',
      data: null,
    });
  });
});


