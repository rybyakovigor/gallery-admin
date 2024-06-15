import { z } from 'zod';

const title = z.string().max(120);

const BaseFramingTypeSchema = z.object({
  title,
});

export const FramingTypeSchema = BaseFramingTypeSchema.extend({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const CreateFramingTypeSchema = BaseFramingTypeSchema;
export const UpdateFramingTypeSchema = CreateFramingTypeSchema.extend({
  id: z.string(),
});

export interface CreateFramingType extends z.infer<typeof CreateFramingTypeSchema> {}
export interface UpdateFramingType extends z.infer<typeof UpdateFramingTypeSchema> {}
export interface FramingType extends z.infer<typeof FramingTypeSchema> {}
