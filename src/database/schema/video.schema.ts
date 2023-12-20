import { object, string, TypeOf } from 'zod';

const videoPayload = {
  sessionId: string({
    required_error: 'Session ID is required',
  }),
  subject: string({
    required_error: 'Subject is required',
  }),
  videoUrl: string({
    required_error: 'Video URL is required',
  }),
};

export const createVideoSchema = object({
  body: object(videoPayload),
});

export const updateVideoSchema = object({
  body: object(videoPayload),
  params: object({
    videoId: string({
      required_error: 'Video ID is required',
    }),
  }),
});

export const deleteVideoSchema = object({
  params: object({
    videoId: string({
      required_error: 'Video ID is required',
    }),
  }),
});

export const getVideoSchema = object({
  params: object({
    videoId: string({
      required_error: 'Video ID is required',
    }),
  }),
});

export type CreateVideoInput = TypeOf<typeof createVideoSchema>;
export type UpdateVideoInput = TypeOf<typeof updateVideoSchema>;
export type ReadVideoInput = TypeOf<typeof getVideoSchema>;
export type DeleteVideoInput = TypeOf<typeof deleteVideoSchema>;