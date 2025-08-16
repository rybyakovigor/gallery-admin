import z from 'zod';

import { FileSchema } from '~/domain/files/file.schema';
import { FramingTypeSchema } from '~/domain/framing-types/framing-types.schema';
import { MaterialSchema } from '~/domain/materials/material.schema';

const REQUIRED = 'Поле обязательно для заполнения';

export const workFormSchema = z.object({
  title: z.string().nonempty(REQUIRED),
  description: z.string().nonempty(REQUIRED),
  width: z.number().int().nonnegative(REQUIRED),
  height: z.number().int().nonnegative(REQUIRED),
  price: z.number().int().nonnegative(REQUIRED),
  is_sold: z.boolean(),
  is_active: z.boolean(),
  materials: z.array(MaterialSchema),
  framing_types: z.array(FramingTypeSchema),
  images: z.array(FileSchema),
});

export type WorkFormData = z.infer<typeof workFormSchema>;
