import { object, array, string, TypeOf  } from 'zod';
import { ObjectType, Field, InputType } from 'type-graphql';

export const chapterPayload = {
  subjectId: string({
    required_error: 'Subject ID is required',
  }),
  chapterName: string({
    required_error: 'Chapter Name is required',
  }),
  chapterId: string({
    required_error: 'Chapter ID is required',
    // Validate that chapterId is a valid MongoDB ObjectId
  }),
  lesson: array(string()), // Assuming lesson IDs are strings, adjust as needed
};

export const createChapterSchema = object({
  body: object(chapterPayload),
});

export const updateChapterSchema = object({
  body: object(chapterPayload),
  params: object({
    chapterId: string({
      required_error: 'Chapter ID is required',
    }),
  }),
});

export const deleteChapterSchema = object({
  params: object({
    chapterId :string({
      required_error: 'Chapter ID is required',
    }),
  }),
});

export const getChapterSchema = object({
  params: object({
    chapterId: string({
      required_error: 'Chapter ID is required',
    }),
  }),
});

export type CreateChapterInput = TypeOf<typeof createChapterSchema>;
export type UpdateChapterInput = TypeOf<typeof updateChapterSchema>;
export type ReadChapterInput = TypeOf<typeof getChapterSchema>;
export type DeleteChapterInput = TypeOf<typeof deleteChapterSchema>;
