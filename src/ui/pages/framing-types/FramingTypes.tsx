// Core
import { observer } from 'mobx-react-lite';
import { Button, Modal, Space, Table, Typography } from 'antd';

// Stores
import framingTypesStore from '~/domain/framing-types/framing-types.store';

// Components
import TitleForm from '~/ui/common/components/form/Form';

// Hooks
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
        dataSource={framingTypes}
        columns={columns}
        pagination={false}
        loading={isLoading}
        rowKey={(row) => row.id}
      />

      <Modal
        title={mode === 'create' ? 'Добавить оформление' : 'Редактировать оформление'}
        open={mode === 'create' ? isCreateModalOpen : isUpdateModalOpen}
        onOk={mode === 'create' ? createMaterialHandler : updateMaterialHandler}
        okText="Сохранить"
        cancelText="Отменить"
        onCancel={mode === 'create' ? closeCreateModalHandler : closeUpdateModalHandler}
        okButtonProps={{ disabled: isSubmitDisabled, loading: isLoading }}
      >
        <TitleForm form={form} ref={inputRef} />
      </Modal>
    </Space>
  );
};

export default observer(FramingTypes);
