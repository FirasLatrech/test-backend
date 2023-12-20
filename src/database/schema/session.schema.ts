import { object, string, number, date, TypeOf } from 'zod';

const sessionPayload = {
  teacherId: string({
    required_error: 'Teacher ID is required',
  }),
  sessionName: string({
    required_error: 'Session Name is required',
  }),
  sessionAbout: string(),
  sessionPrice: number(),
  sessionClass: string(),
  date: date(),
};

export const createSessionSchema = object({
  body: object(sessionPayload),
});

export const updateSessionSchema = object({
  body: object(sessionPayload),
  params: object({
    sessionId: string({
      required_error: 'Session ID is required',
    }),
  }),
});

export const deleteSessionSchema = object({
  params: object({
    sessionId: string({
      required_error: 'Session ID is required',
    }),
  }),
});

export const getSessionSchema = object({
  params: object({
    sessionId: string({
      required_error: 'Session ID is required',
    }),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
export type UpdateSessionInput = TypeOf<typeof updateSessionSchema>;
export type ReadSessionInput = TypeOf<typeof getSessionSchema>;
export type DeleteSessionInput = TypeOf<typeof deleteSessionSchema>;
