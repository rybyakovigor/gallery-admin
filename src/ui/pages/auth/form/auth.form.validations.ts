import z from 'zod';

export const authFormSchema = z.object({
  key: z.string().nonempty('Поле обязательно для заполнения'),
});

export type AuthFormData = z.infer<typeof authFormSchema>;
