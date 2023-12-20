import { object, string, number, boolean, date, array, TypeOf } from 'zod';

const coursePayload = {
  userId: string({
    required_error: 'User ID is required',
  }),
  title: string({
    required_error: 'Title is required',
  }),
  description: string(),
  imageUrl: string(),
  price: number(),
  isPublished: boolean(),
  categoryId: string(),
  category: string(), // Assuming category is a string (adjust as needed)
  chapters: array(string()), // Assuming chapter IDs are strings, adjust as needed
  attachments: array(string()), // Assuming attachment IDs are strings, adjust as needed
  purchases: array(string()), // Assuming purchase IDs are strings, adjust as needed
  createdAt: date(),
  updatedAt: date(),
};

export const createCourseSchema = object({
  body: object(coursePayload),
});

export const updateCourseSchema = object({
  body: object(coursePayload),
  params: object({
    courseId: string({
      required_error: 'Course ID is required',
    }),
  }),
});

export const deleteCourseSchema = object({
  params: object({
    courseId: string({
      required_error: 'Course ID is required',
    }),
  }),
});

export const getCourseSchema = object({
  params: object({
    courseId: string({
      required_error: 'Course ID is required',
    }),
  }),
});

export type CreateCourseInput = TypeOf<typeof createCourseSchema>;
export type UpdateCourseInput = TypeOf<typeof updateCourseSchema>;
export type ReadCourseInput = TypeOf<typeof getCourseSchema>;
export type DeleteCourseInput = TypeOf<typeof deleteCourseSchema>;
