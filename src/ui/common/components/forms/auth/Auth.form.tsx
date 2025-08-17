import { InputText } from 'primereact/inputtext';
import { UseFormReturn } from 'react-hook-form';

import { AuthFormData } from './auth.form.validations';

interface Props {
  form: UseFormReturn<AuthFormData>;
}

const AuthForm = ({ form }: Props): React.ReactElement => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <form className="flex w-full flex-column gap-2">
      <label htmlFor="title">Ключ</label>
      <InputText autoComplete="off" id="key" {...register('key')} className={errors.key ? 'p-invalid' : ''} />
      {errors.key && <small className="p-error">{errors.key?.message}</small>}
    </form>
  );
};

export default AuthForm;
