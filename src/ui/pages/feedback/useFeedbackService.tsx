// Core
import { useState, useEffect } from 'react';
import { message } from 'antd';

// Hooks
import { useRequest } from '~/domain/shared/hooks/useRequest';

// Types
import { ColumnType } from 'antd/es/table';
import { FeedbackStoreType } from '~/domain/feedback/feedback.store';
import { Feedback } from '~/domain/feedback/feedback.schema';

export const useFeedbackService = (feedbackStore: FeedbackStoreType): UseFeedbackServiceReturnType => {
  const { feedback, fetchFeedback } = feedbackStore;

  const { request, isLoading, error } = useRequest();

  useEffect(() => {
    request(fetchFeedback, {}, () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const [columns] = useState([
    {
      title: '#',
      key: 'index',
      width: '20px',
      render: (_: unknown, __: Feedback, index: number) => index + 1,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (email ? <a href={`mailto:${email}`}>{email}</a> : '-'),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => (phone ? <a href={`tel:${phone}`}>{phone}</a> : '-'),
    },
    {
      title: 'Дата создания',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
    },
  ]);

  return {
    feedback,
    isLoading,
    columns,
  };
};

interface UseFeedbackServiceReturnType {
  feedback: Feedback[];
  isLoading: boolean;
  columns: ColumnType<Feedback>[];
}
