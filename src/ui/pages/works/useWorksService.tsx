// Core
import { useState, useEffect, useRef, RefObject } from 'react';
import { Form, FormInstance, InputRef, message } from 'antd';

// Hooks
import { useRequest } from '~/domain/shared/hooks/useRequest';

// Types
import { ColumnType } from 'antd/es/table';
import { Work } from '~/domain/works/work.schema';
import { WorksStoreType } from '~/domain/works/works.store';
import { Material } from '~/domain/materials/material.schema';
import { FramingType } from '~/domain/framing-types/framing-types.schema';

// Utils
import { renderColumns } from '~/ui/common/components/table-columns/table-columns';
import framingTypesStore from '~/domain/framing-types/framing-types.store';
import materialsStore from '~/domain/materials/materials.store';

interface WorkForm extends Omit<Work, 'id' | 'created_at' | 'updated_at' | 'materials' | 'framing_types'> {
  materials: string[];
  framing_types: string[];
}

export const useWorksService = (worksStore: WorksStoreType): UseWorksServiceReturnType => {
  const { works, fetchMWorks, deleteWork, createWork, updateWork } = worksStore;
  const { fetchFramingTypes, framingTypes } = framingTypesStore;
  const { fetchMaterials, materials } = materialsStore;

  const { request: worksRequest, isLoading, error } = useRequest();
  const { request: materialsRequest } = useRequest();
  const { request: framingTypesRequest } = useRequest();

  const [form] = Form.useForm<WorkForm>();
  const inputRef = useRef<InputRef>(null);

  const [mode, setMode] = useState<'create' | 'update'>('create');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentWork, setCurrentWork] = useState<Work | null>(null);

  useEffect(() => {
    framingTypesRequest(fetchFramingTypes, {}, () => {});
    materialsRequest(fetchMaterials, {}, () => {});
    worksRequest(fetchMWorks, {}, () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const openCreateModalHandler = (): void => {
    setMode('create');
    form.setFieldsValue({
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
    });
    setIsCreateModalOpen(true);
    setTimeout(() => {
      inputRef.current?.focus({ cursor: 'end' });
    }, 500);
  };

  const openUpdateModalHandler = (data: Work): void => {
    setMode('update');
    setCurrentWork(data);
    form.setFieldsValue({
      title: data.title,
      description: data.description,
      width: data.width,
      height: data.height,
      price: data.price,
      is_sold: data.is_sold,
      is_active: data.is_active,
      materials: data.materials.map((m) => m.id),
      framing_types: data.framing_types.map((f) => f.id),
      images: data.images,
    });
    setIsUpdateModalOpen(true);
    setTimeout(() => {
      inputRef.current?.focus({ cursor: 'end' });
    }, 500);
  };

  const closeCreateModalHandler = (): void => {
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  const closeUpdateModalHandler = (): void => {
    setIsUpdateModalOpen(false);
    form.resetFields();
  };

  const createWorkHandler = (): void => {
    form
      .validateFields()
      .then((values) => {
        const body = { ...values, images: values.images.map((image) => image.id) };

        worksRequest(createWork, body, () => {
          if (!error) {
            closeCreateModalHandler();
          }
        });
      })
      .catch(() => {});
  };

  const updateWorkHandler = (): void => {
    form
      .validateFields()
      .then((values) => {
        const body = { ...values, images: values.images.map((image) => image.id) };
        worksRequest(updateWork, { ...currentWork, ...body }, () => {
          if (!error) {
            closeUpdateModalHandler();
          }
        });
      })
      .catch(() => {});
  };

  const deleteMaterialHandler = (data: Work): void => {
    worksRequest(deleteWork, data.id, () => {});
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((formValues) => {
        setIsSubmitDisabled(!Object.values(formValues).length); // check keys to handle init state
      })
      .catch(() => {
        setIsSubmitDisabled(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const [columns] = useState(renderColumns(openUpdateModalHandler, deleteMaterialHandler));

  return {
    works,
    framingTypes,
    materials,
    isLoading,
    columns,
    mode,
    form,
    inputRef,
    openCreateModalHandler,
    isCreateModalOpen,
    isUpdateModalOpen,
    createWorkHandler,
    updateWorkHandler,
    closeCreateModalHandler,
    closeUpdateModalHandler,
    isSubmitDisabled,
  };
};

interface UseWorksServiceReturnType {
  works: Work[];
  framingTypes: FramingType[];
  materials: Material[];
  isLoading: boolean;
  columns: ColumnType<Work>[];
  mode: 'create' | 'update';
  form: FormInstance;
  inputRef: RefObject<InputRef | null>;
  openCreateModalHandler: () => void;
  isCreateModalOpen: boolean;
  isUpdateModalOpen: boolean;
  closeCreateModalHandler: () => void;
  closeUpdateModalHandler: () => void;
  createWorkHandler: () => void;
  updateWorkHandler: () => void;
  isSubmitDisabled: boolean;
}
