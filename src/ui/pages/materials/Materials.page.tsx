import { useContext, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import materialsStore from '~/domain/materials/materials.store';
import { useRequest } from '~/domain/shared/hooks/useRequest';

import PageLayout from '~/ui/layouts/page/Page.layout';

import { ToastsContext } from '~/ui/providers/toasts/Toasts.provider';

import TitleForm from '~/ui/common/components/forms/title/Title.form';
import { TitleFormData, titleFormSchema } from '~/ui/common/components/forms/title/title.form.validations';

const MaterialsPage = (): React.ReactElement => {
  const [currentMaterialId, setCurrentMaterialId] = useState<string | null>(null);

  const { error, isLoading, request } = useRequest();

  const { createMaterial, deleteMaterial, fetchMaterials, findMaterial, materials, updateMaterial } = materialsStore;

  const toasts = useContext(ToastsContext);

  const form = useForm<TitleFormData>({
    resolver: zodResolver(titleFormSchema),
  });

  const createHandler = (): void => {
    request(createMaterial, { title: form.getValues('title') }, () => {
      setActiveEntity(null);
    });
  };

  const updateHandler = (id: string): void => {
    request(updateMaterial, { id, title: form.getValues('title') }, () => {
      setActiveEntity(null);
    });
  };

  const deleteHandler = (id: string): void => {
    request(deleteMaterial, id, () => {
      setActiveEntity(null);
    });
  };

  const setActiveEntity = (id: string | null): void => {
    if (id) {
      const framingType = findMaterial(id);

      if (framingType) {
        setCurrentMaterialId(id);
        form.setValue('title', framingType.title);
      }
    } else {
      setCurrentMaterialId(null);
      form.reset();
    }
  };

  useEffect(() => {
    request(fetchMaterials, {}, () => {});

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
      activeEntityId={currentMaterialId}
      createEntityHandler={createHandler}
      data={materials}
      deleteEntityModalHandler={deleteHandler}
      deleteEntityModalText="Вы действительно хотите удалить материал?"
      handleEntityModalChildren={<TitleForm form={form} />}
      handleEntityModalTitle={currentMaterialId ? 'Редактирование материал' : 'Создание материала'}
      isLoading={isLoading}
      setActiveEntity={setActiveEntity}
      title="Материалы"
      updateEntityHandler={updateHandler}
    />
  );
};

export default observer(MaterialsPage);
