import { object, string, TypeOf } from 'zod';

const magazinePayload = {
  chapterId: string({
    required_error: 'Chapter ID is required',
    // Validate that chapterId is a valid MongoDB ObjectId
  }),
  magazineUrl: string({
    required_error: 'Magazine URL is required',
  }),
};

export const createMagazineSchema = object({
  body: object(magazinePayload),
});

export const updateMagazineSchema = object({
  body: object(magazinePayload),
  params: object({
    magazineId: string({
      required_error: 'Magazine ID is required',
    }),
  }),
});

export const deleteMagazineSchema = object({
  params: object({
    magazineId: string({
      required_error: 'Magazine ID is required',
    }),
  }),
});

export const getMagazineSchema = object({
  params: object({
    magazineId: string({
      required_error: 'Magazine ID is required',
      // Validate that magazineId is a valid MongoDB ObjectId
    }),
  }),
});

export type CreateMagazineInput = TypeOf<typeof createMagazineSchema>;
export type UpdateMagazineInput = TypeOf<typeof updateMagazineSchema>;
export type ReadMagazineInput = TypeOf<typeof getMagazineSchema>;
export type DeleteMagazineInput = TypeOf<typeof deleteMagazineSchema>;
