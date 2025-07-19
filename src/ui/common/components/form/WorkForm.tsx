// Core
import React from 'react';
import { Form, Input, FormInstance, InputRef, InputNumber, Switch, Select } from 'antd';

// Types
import { Work } from '~/domain/works/work.schema';
import { Material } from '~/domain/materials/material.schema';
import { FramingType } from '~/domain/framing-types/framing-types.schema';

// Components
import TextArea from 'antd/es/input/TextArea';
import ImageUploader from '../image-uploader/ImageUploader';

// Constants
import { REQUIRED_FIELD_ERROR } from '~/domain/shared/validations/constants';

interface PropsType {
  form: FormInstance;
  materials: Material[];
  framingTypes: FramingType[];
  ref: React.RefObject<InputRef | null>;
}

const TitleForm = ({ form, materials, framingTypes, ref }: PropsType): React.ReactElement => {
  return (
    <Form autoComplete="off" form={form} labelCol={{ span: 6 }} layout="horizontal">
      <Form.Item<Work> label="Название" name="title" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
        <Input ref={ref} />
      </Form.Item>
      <Form.Item<Work> label="Описание" name="description">
        <TextArea />
      </Form.Item>
      <Form.Item<Work> label="Ширина" name="width" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
        <InputNumber min={1} type="number" />
      </Form.Item>
      <Form.Item<Work> label="Высота" name="height" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
        <InputNumber min={1} type="number" />
      </Form.Item>
      <Form.Item<Work> label="Цена" name="price" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
        <InputNumber min={1} type="number" />
      </Form.Item>
      <Form.Item<Work> label="Материалы" name="materials" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
        <Select
          allowClear
          mode="multiple"
          options={materials.map((material) => ({ label: material.title, value: material.id }))}
          placeholder="Выберете варианты"
          style={{ width: '100%' }}
          onChange={(values) => {
            form.setFieldValue('materials', values);
          }}
        />
      </Form.Item>
      <Form.Item<Work>
        label="Оформление"
        name="framing_types"
        rules={[{ required: true, message: 'Поле не может быть пустым' }]}
      >
        <Select
          allowClear
          mode="multiple"
          options={framingTypes.map((type) => ({ label: type.title, value: type.id }))}
          placeholder="Выберете вариант оформления"
          style={{ width: '100%' }}
          onChange={(values) => {
            form.setFieldValue('framing_types', values);
          }}
        />
      </Form.Item>
      <Form.Item<Work> label="Изображения" name="images">
        <ImageUploader
          images={form.getFieldValue('images')}
          setImages={(images) => {
            form.setFieldValue('images', images);
          }}
        />
      </Form.Item>
      <Form.Item<Work> label="Продано" name="is_sold">
        <Switch />
      </Form.Item>
      <Form.Item<Work> label="Показывать" name="is_active">
        <Switch />
      </Form.Item>
    </Form>
  );
};

export default TitleForm;
