import React from 'react';
import { Form, Input, FormInstance, InputRef } from 'antd';

type FieldType = { title: string };

interface PropsType {
  form: FormInstance;
  ref?: React.RefObject<InputRef | null>;
}

const TitleForm = ({ form, ref }: PropsType): React.ReactElement => {
  return (
    <Form autoComplete="off" form={form}>
      <Form.Item<FieldType>
        label="Название"
        name="title"
        rules={[{ required: true, message: 'Поле не может быть пустым' }]}
      >
        <Input ref={ref} />
      </Form.Item>
    </Form>
  );
};

export default TitleForm;
