import { object, string, boolean, date, TypeOf } from 'zod';

const userPayload = {
  name: string({
    required_error: 'Name is required',
  }),
  phone: string({
    required_error: 'Phone is required',
  }),
  email: string({
    required_error: 'Email is required',
  }),
  classe: string({
    required_error: 'Class is required',
  }),
  photo: string(),
  role: string({
    required_error: 'Role is required',
  }),
  password: string({
    required_error: 'Password is required',
  }),
  passwordChangedAt: date(),
  passwordResetToken: string(),
  passwordResetExpires: date(),
  active: boolean(),
};

export const createUserSchema = object({
  body: object(userPayload),
});

export const updateUserSchema = object({
  body: object(userPayload),
  params: object({
    userId: string({
      required_error: 'User ID is required',
    }),
  }),
});

export const deleteUserSchema = object({
  params: object({
    userId: string({
      required_error: 'User ID is required',
    }),
  }),
});

export const getUserSchema = object({
  params: object({
    userId: string({
      required_error: 'User ID is required',
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
