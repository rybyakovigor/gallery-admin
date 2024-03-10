// Core
import { useState, useEffect, useRef } from 'react';
import { Form, FormInstance, InputRef, message } from 'antd';

// Hooks
import { useRequest } from '~/domain/shared/hooks/useRequest';

// Types
import { ColumnType } from 'antd/es/table';
import { MaterialsStoreType } from '~/domain/materials/materials.store';
import { Material } from '~/domain/materials/types/material';

// Utils
import { renderColumns } from '~/ui/common/components/table-columns/table-columns';

export const useMaterialsService = (materialsStore: MaterialsStoreType): UseMaterialsServiceReturnType => {
  const { materials, fetchMaterials, deleteMaterial, createMaterial, updateMaterial } = materialsStore;

  const { request, isLoading, error } = useRequest();
  const [form] = Form.useForm<{ title: string }>();
  const inputRef = useRef<InputRef>(null);

  const [mode, setMode] = useState<'create' | 'update'>('create');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);

  useEffect(() => {
    request(fetchMaterials, {}, () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const openCreateModalHandler = (): void => {
    setMode('create');
    setIsCreateModalOpen(true);
    setTimeout(() => {
      inputRef.current?.focus({ cursor: 'end' });
    }, 500);
  };

  const openUpdateModalHandler = (data: Material): void => {
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
        request(createMaterial, values, () => {
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
        request(updateMaterial, { ...currentMaterial, ...values }, () => {
          if (!error) {
            closeUpdateModalHandler();
          }
        });
      })
      .catch(() => {});
  };

  const deleteMaterialHandler = (data: Material): void => {
    request(deleteMaterial, data.id, () => {});
  };

  const [columns] = useState(renderColumns(openUpdateModalHandler, deleteMaterialHandler));

  return {
    materials,
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
  };
};

interface UseMaterialsServiceReturnType {
  materials: Material[];
  isLoading: boolean;
  columns: ColumnType<Material>[];
  mode: 'create' | 'update';
  form: FormInstance;
  inputRef: React.RefObject<InputRef>;
  openCreateModalHandler: () => void;
  isCreateModalOpen: boolean;
  isUpdateModalOpen: boolean;
  closeCreateModalHandler: () => void;
  closeUpdateModalHandler: () => void;
  createMaterialHandler: () => void;
  updateMaterialHandler: () => void;
}
