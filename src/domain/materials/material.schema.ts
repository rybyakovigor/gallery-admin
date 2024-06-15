import { z } from 'zod';

const title = z.string().max(120);

const BaseMaterialSchema = z.object({
  title,
});

export const MaterialSchema = BaseMaterialSchema.extend({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const CreateMaterialSchema = BaseMaterialSchema;
export const UpdateMaterialSchema = CreateMaterialSchema.extend({
  id: z.string(),
});

export interface CreateMaterial extends z.infer<typeof CreateMaterialSchema> {}
export interface UpdateMaterial extends z.infer<typeof UpdateMaterialSchema> {}
export interface Material extends z.infer<typeof MaterialSchema> {}
