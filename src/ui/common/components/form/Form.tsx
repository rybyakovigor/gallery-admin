import React from 'react';
import { Form, Input, FormInstance, InputRef } from 'antd';

type FieldType = {
  title: string;
};

interface PropsType {
  form: FormInstance;
}

const TitleForm = React.forwardRef<InputRef, PropsType>(({ form }, inputRef): React.ReactElement => {
  return (
    <Form form={form} autoComplete="off">
      <Form.Item<FieldType>
        label="Название"
        name="title"
        rules={[{ required: true, message: 'Поле не может быть пустым' }]}
      >
        <Input ref={inputRef} />
      </Form.Item>
    </Form>
  );
});

export default TitleForm;
