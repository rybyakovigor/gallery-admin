import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';

import authStore from '~/domain/auth/auth.store';

import { ToastsContext } from '~/ui/providers/toasts/Toasts.provider';

import AuthForm from '~/ui/common/components/forms/auth/Auth.form';
import { authFormSchema } from '~/ui/common/components/forms/auth/auth.form.validations';
import { PageRoute } from '~/ui/navigation/pages';

const Auth = (): React.ReactElement => {
  const { isAuth, login } = authStore;
  const navigate = useNavigate();

  const toasts = useContext(ToastsContext);

  const form = useForm<{ key: string }>({
    resolver: zodResolver(authFormSchema),
  });

  const submit = form.handleSubmit((values) => {
    try {
      login(values.key);
      navigate(PageRoute.WORKS);
    } catch (error) {
      toasts?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: (error as Error).message,
      });
    }
  });

  if (isAuth) {
    navigate(PageRoute.ROOT);
  }

  return (
    <main className="flex h-screen align-items-center justify-content-center">
      <div className="w-6 flex flex-column align-items-center justify-content-center gap-3">
        <AuthForm form={form} />
        <Button label="Войти" onClick={submit} />
      </div>
    </main>
  );
};

export default observer(Auth);
