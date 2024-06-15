import { z } from 'zod';

export const FileSchema = z.object({
  id: z.string(),
  title: z.string(),
  key: z.string(),
  path: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  work_image_id: z.string().nullable(),
});

export type AppFile = z.infer<typeof FileSchema>;
