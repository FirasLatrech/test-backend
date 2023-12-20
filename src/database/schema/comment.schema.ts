import { object, string, number, TypeOf } from 'zod';

const commentPayload = {
  lessonId: string({
    required_error: 'Lesson ID is required',
  }),
  userId: string({
    required_error: 'User ID is required',
  }),
  commentText: string({
    required_error: 'Comment text is required',
  }),
  likes: number(), // Assuming likes is a number, adjust as needed
};

export const createCommentSchema = object({
  body: object(commentPayload),
});

export const updateCommentSchema = object({
  body: object(commentPayload),
  params: object({
    commentId: string({
      required_error: 'Comment ID is required',
    }),
  }),
});

export const deleteCommentSchema = object({
  params: object({
    commentId: string({
      required_error: 'Comment ID is required',
    }),
  }),
});

export const getCommentSchema = object({
  params: object({
    commentId: string({
      required_error: 'Comment ID is required',
    }),
  }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>;
export type ReadCommentInput = TypeOf<typeof getCommentSchema>;
export type DeleteCommentInput = TypeOf<typeof deleteCommentSchema>;
