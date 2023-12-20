import { object, string, number, TypeOf } from 'zod';

const lessonPayload = {
  chapterId: string({
    required_error: 'Chapter ID is required',
  }),
  lessonName: string({
    required_error: 'Lesson Name is required',
  }),
  content: string({
    required_error: 'Content is required',
  }),
  commentCount: number(),
  likeCount: number(),
};

export const createLessonSchema = object({
  body: object(lessonPayload),
});

export const updateLessonSchema = object({
  body: object(lessonPayload),
  params: object({
    lessonId: string({
      required_error: 'Lesson ID is required',
    }),
  }),
});

export const deleteLessonSchema = object({
  params: object({
    lessonId: string({
      required_error: 'Lesson ID is required',
    }),
  }),
});

export const getLessonSchema = object({
  params: object({
    lessonId: string({
      required_error: 'Lesson ID is required',
    }),
  }),
});

export type CreateLessonInput = TypeOf<typeof createLessonSchema>;
export type UpdateLessonInput = TypeOf<typeof updateLessonSchema>;
export type ReadLessonInput = TypeOf<typeof getLessonSchema>;
export type DeleteLessonInput = TypeOf<typeof deleteLessonSchema>;
