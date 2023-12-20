import { object, string, TypeOf } from 'zod';

const rolePayload = {
  roleName: string({
    required_error: 'Role Name is required',
  }),
};

export const createRoleSchema = object({
  body: object(rolePayload),
});

export const updateRoleSchema = object({
  body: object(rolePayload),
  params: object({
    roleId: string({
      required_error: 'Role ID is required',
    }),
  }),
});

export const deleteRoleSchema = object({
  params: object({
    roleId: string({
      required_error: 'Role ID is required',
    }),
  }),
});

export const getRoleSchema = object({
  params: object({
    roleId: string({
      required_error: 'Role ID is required',
    }),
  }),
});

export type CreateRoleInput = TypeOf<typeof createRoleSchema>;
export type UpdateRoleInput = TypeOf<typeof updateRoleSchema>;
export type ReadRoleInput = TypeOf<typeof getRoleSchema>;
export type DeleteRoleInput = TypeOf<typeof deleteRoleSchema>;
