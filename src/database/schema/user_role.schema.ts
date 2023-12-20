import { object, string, TypeOf } from 'zod';

const userRolePayload = {
  userId: string({
    required_error: 'User ID is required',
  }),
  roleId: string({
    required_error: 'Role ID is required',
  }),
};

export const createUserRoleSchema = object({
  body: object(userRolePayload),
});

export const updateUserRoleSchema = object({
  body: object(userRolePayload),
  params: object({
    userRoleId: string({
      required_error: 'User Role ID is required',
    }),
  }),
});

export const deleteUserRoleSchema = object({
  params: object({
    userRoleId: string({
      required_error: 'User Role ID is required',
    }),
  }),
});

export const getUserRoleSchema = object({
  params: object({
    userRoleId: string({
      required_error: 'User Role ID is required',
    }),
  }),
});

export type CreateUserRoleInput = TypeOf<typeof createUserRoleSchema>;
export type UpdateUserRoleInput = TypeOf<typeof updateUserRoleSchema>;
export type ReadUserRoleInput = TypeOf<typeof getUserRoleSchema>;
export type DeleteUserRoleInput = TypeOf<typeof deleteUserRoleSchema>;
