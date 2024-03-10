// Core
import { observer } from 'mobx-react-lite';
import { Button, Modal, Space, Table, Typography } from 'antd';

// Stores
import materialsStore from '~/domain/materials/materials.store';

// Components
import MaterialForm from './form/Form';

// Hooks
import { useMaterialsService } from './useMaterialsService';

const Materials = (): React.ReactElement => {
  const {
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
  } = useMaterialsService(materialsStore);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title level={1} style={{ marginBottom: 6 }}>
          Материалы
        </Typography.Title>
        <Button onClick={openCreateModalHandler}>Добавить</Button>
      </Space>

      <Table dataSource={materials} columns={columns} pagination={false} loading={isLoading} rowKey={(row) => row.id} />

      <Modal
        title={mode === 'create' ? 'Добавить материал' : 'Редактировать материал'}
        open={mode === 'create' ? isCreateModalOpen : isUpdateModalOpen}
        onOk={mode === 'create' ? createMaterialHandler : updateMaterialHandler}
        okText="Сохранить"
        cancelText="Отменить"
        onCancel={mode === 'create' ? closeCreateModalHandler : closeUpdateModalHandler}
      >
        <MaterialForm form={form} ref={inputRef} />
      </Modal>
    </Space>
  );
};

export default observer(Materials);
