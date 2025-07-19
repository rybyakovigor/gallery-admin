import { Button, Modal, Space, Table, Typography } from 'antd';
import { observer } from 'mobx-react-lite';

import framingTypesStore from '~/domain/framing-types/framing-types.store';

import TitleForm from '~/ui/common/components/form/Form';

import { useFramingTypesService } from './useFramingTypesService';

const FramingTypes = (): React.ReactElement => {
  const {
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
  } = useFramingTypesService(framingTypesStore);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title level={1} style={{ marginBottom: 6 }}>
          Варианты оформления
        </Typography.Title>
        <Button onClick={openCreateModalHandler}>Добавить</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={framingTypes}
        loading={isLoading}
        pagination={false}
        rowKey={(row) => row.id}
      />

      <Modal
        cancelText="Отменить"
        okButtonProps={{ disabled: isSubmitDisabled, loading: isLoading }}
        okText="Сохранить"
        open={mode === 'create' ? isCreateModalOpen : isUpdateModalOpen}
        title={mode === 'create' ? 'Добавить оформление' : 'Редактировать оформление'}
        onCancel={mode === 'create' ? closeCreateModalHandler : closeUpdateModalHandler}
        onOk={mode === 'create' ? createMaterialHandler : updateMaterialHandler}
      >
        <TitleForm ref={inputRef} form={form} />
      </Modal>
    </Space>
  );
};

export default observer(FramingTypes);
