import { z } from 'zod';
import { MaterialSchema } from '../materials/material.schema';
import { FramingTypeSchema } from '../framing-types/framing-types.schema';
import { FileSchema } from '../files/file.schema';

const title = z.string().max(120);
const description = z.string();
const dimension = z.number().int();
const price = z.number().int();
const is_sold = z.boolean();
const materials = z.array(MaterialSchema);
const framing_types = z.array(FramingTypeSchema);
const images = z.array(FileSchema);

const BaseWorkSchema = z.object({
  title,
  description,
  width: dimension,
  height: dimension,
  price,
  is_sold,
  materials,
  framing_types,
  images,
});

export const CreateWorkSchema = BaseWorkSchema.extend({
  is_sold: is_sold.optional().default(false),
  framing_types: z.array(z.string()),
  images: z.array(z.string()),
  materials: z.array(z.string()),
});

export const UpdateWorkSchema = CreateWorkSchema.partial().extend({
  id: z.string(),
});

export const WorkSchema = BaseWorkSchema.extend({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export interface CreateWork extends z.infer<typeof CreateWorkSchema> {}
export interface UpdateWork extends z.infer<typeof UpdateWorkSchema> {}
export interface Work extends z.infer<typeof WorkSchema> {}
