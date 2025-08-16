import { InputText } from 'primereact/inputtext';
import { UseFormReturn } from 'react-hook-form';

import { TitleFormData } from './title.form.validations';

interface Props {
  form: UseFormReturn<TitleFormData>;
}

const TitleForm = ({ form }: Props): React.ReactElement => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <form className="flex flex-column gap-2">
      <label htmlFor="title">Название</label>
      <InputText autoComplete="off" id="title" {...register('title')} className={errors.title ? 'p-invalid' : ''} />
      {errors.title && <small className="p-error">{errors.title?.message}</small>}
    </form>
  );
};

export default TitleForm;
