import { useEffect, useRef, useState } from 'react';

import { Form, FormInstance, InputRef, message } from 'antd';
import { ColumnType } from 'antd/es/table';

import { FramingType } from '~/domain/framing-types/framing-types.schema';
import { FramingTypesStoreType } from '~/domain/framing-types/framing-types.store';
import { useRequest } from '~/domain/shared/hooks/useRequest';

import { renderColumns } from '~/ui/common/components/table-columns/table-columns';

export const useFramingTypesService = (framingTypesStore: FramingTypesStoreType): UseMaterialsServiceReturnType => {
  const { framingTypes, fetchFramingTypes, deleteFramingTypes, createFramingTypes, updateFramingTypes } =
    framingTypesStore;

  const { request, isLoading, error } = useRequest();
  const [form] = Form.useForm<{ title: string }>();
  const inputRef = useRef<InputRef>(null);

  const [mode, setMode] = useState<'create' | 'update'>('create');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<FramingType | null>(null);

  useEffect(() => {
    request(fetchFramingTypes, {}, () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const openCreateModalHandler = (): void => {
    setMode('create');
    setIsCreateModalOpen(true);
    setTimeout(() => {
      inputRef.current?.focus({ cursor: 'end' });
    }, 500);
  };

  const openUpdateModalHandler = (data: FramingType): void => {
    setMode('update');
    setCurrentMaterial(data);
    form.setFieldsValue({ title: data.title });
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

  const createMaterialHandler = (): void => {
    form
      .validateFields()
      .then((values) => {
        request(createFramingTypes, values, () => {
          if (!error) {
            closeCreateModalHandler();
          }
        });
      })
      .catch(() => {});
  };

  const updateMaterialHandler = (): void => {
    form
      .validateFields()
      .then((values) => {
        request(updateFramingTypes, { ...currentMaterial, ...values }, () => {
          if (!error) {
            closeUpdateModalHandler();
          }
        });
      })
      .catch(() => {});
  };

  const deleteMaterialHandler = (data: FramingType): void => {
    request(deleteFramingTypes, data.id, () => {});
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
    framingTypes,
    isLoading,
    columns,
    mode,
    form,
    inputRef,
    openCreateModalHandler,
    isCreateModalOpen,
    isUpdateModalOpen,
    createMaterialHandler,
    updateMaterialHandler,
    closeCreateModalHandler,
    closeUpdateModalHandler,
    isSubmitDisabled,
  };
};

interface UseMaterialsServiceReturnType {
  framingTypes: FramingType[];
  isLoading: boolean;
  columns: ColumnType<FramingType>[];
  mode: 'create' | 'update';
  form: FormInstance;
  inputRef: React.RefObject<InputRef | null>;
  openCreateModalHandler: () => void;
  isCreateModalOpen: boolean;
  isUpdateModalOpen: boolean;
  closeCreateModalHandler: () => void;
  closeUpdateModalHandler: () => void;
  createMaterialHandler: () => void;
  updateMaterialHandler: () => void;
  isSubmitDisabled: boolean;
}
