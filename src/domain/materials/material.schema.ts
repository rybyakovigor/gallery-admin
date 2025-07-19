import { z } from 'zod';

const title = z.string().max(120);

const BaseMaterialSchema = z.object({ title });

export const MaterialSchema = BaseMaterialSchema.extend({ id: z.string(), created_at: z.date(), updated_at: z.date() });

export const CreateMaterialSchema = BaseMaterialSchema;
export const UpdateMaterialSchema = CreateMaterialSchema.extend({ id: z.string() });

export type CreateMaterial = z.infer<typeof CreateMaterialSchema>;
export type UpdateMaterial = z.infer<typeof UpdateMaterialSchema>;
export type Material = z.infer<typeof MaterialSchema>;
