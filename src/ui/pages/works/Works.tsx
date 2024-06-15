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

      <Table dataSource={works} columns={columns} pagination={false} loading={isLoading} rowKey={(row) => row.id} />

      <Modal
        title={mode === 'create' ? 'Добавить работу' : 'Редактировать работу'}
        open={mode === 'create' ? isCreateModalOpen : isUpdateModalOpen}
        onOk={mode === 'create' ? createWorkHandler : updateWorkHandler}
        okText="Сохранить"
        cancelText="Отменить"
        onCancel={mode === 'create' ? closeCreateModalHandler : closeUpdateModalHandler}
        okButtonProps={{ disabled: isSubmitDisabled, loading: isLoading }}
      >
        <WorkForm form={form} materials={materials} framingTypes={framingTypes} ref={inputRef} />
      </Modal>
    </Space>
  );
};

export default Works;
