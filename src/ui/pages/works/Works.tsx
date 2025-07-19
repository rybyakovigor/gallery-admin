// Core
import { Button, Modal, Space, Table, Typography } from 'antd';

// Store
import worksStore from '~/domain/works/works.store';

// Service
import { useWorksService } from './useWorksService';

// Components
import WorkForm from '~/ui/common/components/form/WorkForm';

const Works = (): React.ReactElement => {
  const {
    works,
    materials,
    framingTypes,
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
  } = useWorksService(worksStore);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title level={1} style={{ marginBottom: 6 }}>
          Работы
        </Typography.Title>
        <Button onClick={openCreateModalHandler}>Добавить</Button>
      </Space>

      <Table columns={columns} dataSource={works} loading={isLoading} pagination={false} rowKey={(row) => row.id} />

      <Modal
        cancelText="Отменить"
        okButtonProps={{ disabled: isSubmitDisabled, loading: isLoading }}
        okText="Сохранить"
        open={mode === 'create' ? isCreateModalOpen : isUpdateModalOpen}
        title={mode === 'create' ? 'Добавить работу' : 'Редактировать работу'}
        onCancel={mode === 'create' ? closeCreateModalHandler : closeUpdateModalHandler}
        onOk={mode === 'create' ? createWorkHandler : updateWorkHandler}
      >
        <WorkForm ref={inputRef} form={form} framingTypes={framingTypes} materials={materials} />
      </Modal>
    </Space>
  );
};

export default Works;
