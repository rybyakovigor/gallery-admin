import { useContext, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import framingTypesStore from '~/domain/framing-types/framing-types.store';
import materialsStore from '~/domain/materials/materials.store';
import { useRequest } from '~/domain/shared/hooks/useRequest';
import worksStore from '~/domain/works/works.store';

import PageLayout from '~/ui/layouts/page/Page.layout';

import { ToastsContext } from '~/ui/providers/toasts/Toasts.provider';

import WorkForm from '~/ui/common/components/forms/work/Work.form';
import { WorkFormData, workFormSchema } from '~/ui/common/components/forms/work/work.form.validations';

const WorksPage = (): React.ReactElement => {
  const [currentWorkId, setCurrentWorkId] = useState<string | null>(null);

  const { createWork, deleteWork, fetchWorks, findWork, updateWork, works } = worksStore;
  const { fetchFramingTypes, framingTypes } = framingTypesStore;
  const { fetchMaterials, materials } = materialsStore;

  const { error, isLoading, request } = useRequest();
  const { request: materialsRequest } = useRequest();
  const { request: framingTypesRequest } = useRequest();

  const toasts = useContext(ToastsContext);

  const form = useForm<WorkFormData>({
    resolver: zodResolver(workFormSchema),
    defaultValues: {
      title: '',
      description: '',
      width: 0,
      height: 0,
      price: 0,
      is_sold: false,
      is_active: false,
      materials: [],
      framing_types: [],
      images: [],
    },
  });

  const createHandler = (): void => {
    const body = form.getValues();

    request(
      createWork,
      {
        ...body,
        images: images.map((i) => i.id),
        materials: body.materials.map((m) => m.id),
        framing_types: body.framing_types.map((f) => f.id),
      },
      () => {
        setActiveEntity(null);
      }
    );
  };

  const updateHandler = (id: string): void => {
    const body = form.getValues();

    request(
      updateWork,
      {
        id,
        ...body,
        images: images.map((i) => i.id),
        materials: body.materials.map((m) => m.id),
        framing_types: body.framing_types.map((f) => f.id),
      },
      () => {
        setActiveEntity(null);
      }
    );
  };

  const deleteHandler = (id: string): void => {
    request(deleteWork, id, () => {
      setActiveEntity(null);
    });
  };

  const setActiveEntity = (id: string | null): void => {
    if (!id) {
      setCurrentWorkId(null);
      form.reset();
      return;
    }

    const work = findWork(id);

    if (work) {
      setCurrentWorkId(id);
      form.setValue('title', work.title);
      form.setValue('description', work.description);
      form.setValue('width', work.width);
      form.setValue('height', work.height);
      form.setValue('price', work.price);
      form.setValue('is_sold', work.is_sold);
      form.setValue('is_active', work.is_active);
      form.setValue('materials', work.materials);
      form.setValue('framing_types', work.framing_types);
      form.setValue('images', work.images);
    }
  };

  const images = form.watch('images');

  useEffect(() => {
    request(fetchWorks, {}, () => {});
    materialsRequest(fetchMaterials, {}, () => {});
    framingTypesRequest(fetchFramingTypes, {}, () => {});

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
      activeEntityId={currentWorkId}
      createEntityHandler={createHandler}
      data={works}
      deleteEntityModalHandler={deleteHandler}
      deleteEntityModalText="Вы действительно хотите удалить работу?"
      handleEntityModalChildren={
        <WorkForm form={form} framingTypes={framingTypes} images={images} materials={materials} />
      }
      handleEntityModalTitle={currentWorkId ? 'Редактирование работы' : 'Создание работы'}
      isLoading={isLoading}
      setActiveEntity={setActiveEntity}
      title="Работы"
      updateEntityHandler={updateHandler}
    />
  );
};

export default observer(WorksPage);
