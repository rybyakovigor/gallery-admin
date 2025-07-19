import { Button, Modal, Space, Table, Typography } from 'antd';
import { observer } from 'mobx-react-lite';

import materialsStore from '~/domain/materials/materials.store';

import TitleForm from '~/ui/common/components/form/Form';

import { useMaterialsService } from './useMaterialsService';

const Materials = (): React.ReactElement => {
  const {
    closeCreateModalHandler,
    closeUpdateModalHandler,
    columns,
    createMaterialHandler,
    form,
    inputRef,
    isCreateModalOpen,
    isLoading,
    isSubmitDisabled,
    isUpdateModalOpen,
    materials,
    mode,
    openCreateModalHandler,
    updateMaterialHandler,
  } = useMaterialsService(materialsStore);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title level={1} style={{ marginBottom: 6 }}>
          Материалы
        </Typography.Title>
        <Button onClick={openCreateModalHandler}>Добавить</Button>
      </Space>

      <Table columns={columns} dataSource={materials} loading={isLoading} pagination={false} rowKey={(row) => row.id} />

      <Modal
        cancelText="Отменить"
        okButtonProps={{ disabled: isSubmitDisabled, loading: isLoading }}
        okText="Сохранить"
        open={mode === 'create' ? isCreateModalOpen : isUpdateModalOpen}
        title={mode === 'create' ? 'Добавить материал' : 'Редактировать материал'}
        onCancel={mode === 'create' ? closeCreateModalHandler : closeUpdateModalHandler}
        onOk={mode === 'create' ? createMaterialHandler : updateMaterialHandler}
      >
        <TitleForm ref={inputRef} form={form} />
      </Modal>
    </Space>
  );
};

export default observer(Materials);
