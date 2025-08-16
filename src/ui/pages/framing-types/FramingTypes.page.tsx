import { useContext, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import framingTypesStore from '~/domain/framing-types/framing-types.store';
import { useRequest } from '~/domain/shared/hooks/useRequest';

import PageLayout from '~/ui/layouts/page/Page.layout';

import { ToastsContext } from '~/ui/providers/toasts/Toasts.provider';

import TitleForm from '~/ui/common/components/forms/title/Title.form';
import { TitleFormData, titleFormSchema } from '~/ui/common/components/forms/title/title.form.validations';

const FramingTypes = (): React.ReactElement => {
  const [currentFramingTypeId, setCurrentFramingTypeId] = useState<string | null>(null);

  const { error, isLoading, request } = useRequest();

  const {
    createFramingTypes,
    deleteFramingTypes,
    fetchFramingTypes,
    findFramingType,
    framingTypes,
    updateFramingTypes,
  } = framingTypesStore;

  const toasts = useContext(ToastsContext);

  const form = useForm<TitleFormData>({
    resolver: zodResolver(titleFormSchema),
  });

  const createFramingTypesHandler = (): void => {
    request(createFramingTypes, { title: form.getValues('title') }, () => {
      setActiveEntity(null);
    });
  };

  const updateFramingTypesHandler = (id: string): void => {
    request(updateFramingTypes, { id, title: form.getValues('title') }, () => {
      setActiveEntity(null);
    });
  };

  const deleteFramingTypesHandler = (id: string): void => {
    request(deleteFramingTypes, id, () => {
      setActiveEntity(null);
    });
  };

  const setActiveEntity = (id: string | null): void => {
    if (id) {
      const framingType = findFramingType(id);

      if (framingType) {
        setCurrentFramingTypeId(id);
        form.setValue('title', framingType.title);
      }
    } else {
      setCurrentFramingTypeId(null);
      form.reset();
    }
  };

  useEffect(() => {
    request(fetchFramingTypes, {}, () => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toasts?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
      });
    }
  }, [error, toasts]);

  return (
    <PageLayout
      activeEntityId={currentFramingTypeId}
      createEntityHandler={createFramingTypesHandler}
      data={framingTypes}
      deleteEntityModalHandler={deleteFramingTypesHandler}
      deleteEntityModalText="Вы действительно хотите удалить оформление?"
      handleEntityModalChildren={<TitleForm form={form} />}
      handleEntityModalTitle={currentFramingTypeId ? 'Редактирование оформления' : 'Создание оформления'}
      isLoading={isLoading}
      setActiveEntity={setActiveEntity}
      title="Варианты оформления"
      updateEntityHandler={updateFramingTypesHandler}
    />
  );
};

export default observer(FramingTypes);
