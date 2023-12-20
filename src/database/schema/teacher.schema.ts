import { object, string, array, TypeOf } from 'zod';

const teacherPayload = {
  userId: string({
    required_error: 'User ID is required',
  }),
  subject: string({
    required_error: 'Subject is required',
  }),
  teacherName: string(), // Assuming teacherName is a string, adjust as needed
  classesTaught: array(string()), // Assuming classesTaught are strings, adjust as needed
};

export const createTeacherSchema = object({
  body: object(teacherPayload),
});

export const updateTeacherSchema = object({
  body: object(teacherPayload),
  params: object({
    teacherId: string({
      required_error: 'Teacher ID is required',
    }),
  }),
});

export const deleteTeacherSchema = object({
  params: object({
    teacherId: string({
      required_error: 'Teacher ID is required',
    }),
  }),
});

export const getTeacherSchema = object({
  params: object({
    teacherId: string({
      required_error: 'Teacher ID is required',
    }),
  }),
});

export type CreateTeacherInput = TypeOf<typeof createTeacherSchema>;
export type UpdateTeacherInput = TypeOf<typeof updateTeacherSchema>;
export type ReadTeacherInput = TypeOf<typeof getTeacherSchema>;
export type DeleteTeacherInput = TypeOf<typeof deleteTeacherSchema>;
