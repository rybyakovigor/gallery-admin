import { Space, Table, Typography } from 'antd';
import { observer } from 'mobx-react-lite';

import feedbackStore from '~/domain/feedback/feedback.store';

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

      <Table columns={columns} dataSource={feedback} loading={isLoading} pagination={false} rowKey={(row) => row.id} />
    </Space>
  );
};

export default observer(Feedbacks);
