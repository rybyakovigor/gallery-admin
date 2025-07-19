import { Button, Space } from 'antd';
import { ColumnType } from 'antd/es/table';

export const renderColumns = <T,>(
  updateHandler: (data: T) => void,
  deleteHandler: (data: T) => void
): ColumnType<T>[] => {
  return [
    {
      title: '#',
      key: 'index',
      width: '20px',
      render: (_: unknown, __: T, index: number) => index + 1,
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: T) => (
        <Space>
          <Button type="link" onClick={() => updateHandler(record)}>
            Редактировать
          </Button>
          <Button type="link" onClick={() => deleteHandler(record)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];
};
