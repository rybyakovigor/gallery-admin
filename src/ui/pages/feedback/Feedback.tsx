// Core
import { observer } from 'mobx-react-lite';
import { Space, Table, Typography } from 'antd';

// Stores
import feedbackStore from '~/domain/feedback/feedback.store';

// Hooks
import { useFeedbackService } from './useFeedbackService';

const Feedbacks = (): React.ReactElement => {
  const { feedback, columns, isLoading } = useFeedbackService(feedbackStore);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title level={1} style={{ marginBottom: 6 }}>
          Обратная связь
        </Typography.Title>
      </Space>

      <Table dataSource={feedback} columns={columns} pagination={false} loading={isLoading} rowKey={(row) => row.id} />
    </Space>
  );
};

export default observer(Feedbacks);
