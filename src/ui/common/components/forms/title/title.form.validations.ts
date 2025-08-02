import z from 'zod';

export const titleFormSchema = z.object({
  title: z.string().nonempty('Поле обязательно для заполнения'),
});

export type TitleFormData = z.infer<typeof titleFormSchema>;
