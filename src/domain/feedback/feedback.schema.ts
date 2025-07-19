import { z } from 'zod';

const name = z.string();
const id = z.string();
const created_at = z.date();
const email = z.string().optional();
const phone = z.string().optional();

export const BaseFeedbackSchema = z.object({ id, name, email, phone, created_at });

export type Feedback = z.infer<typeof BaseFeedbackSchema>;
