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

interface FieldType extends Work {}

interface PropsType {
  form: FormInstance;
  materials: Material[];
  framingTypes: FramingType[];
}

const TitleForm = React.forwardRef<InputRef, PropsType>(
  ({ form, materials, framingTypes }, inputRef): React.ReactNode => {
    return (
      <Form form={form} labelCol={{ span: 6 }} layout="horizontal" autoComplete="off">
        <Form.Item<FieldType> label="Название" name="title" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
          <Input ref={inputRef} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Описание"
          name="description"
          rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item<FieldType> label="Ширина" name="width" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
          <InputNumber type="number" min={1} />
        </Form.Item>
        <Form.Item<FieldType> label="Высота" name="height" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
          <InputNumber type="number" min={1} />
        </Form.Item>
        <Form.Item<FieldType> label="Цена" name="price" rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}>
          <InputNumber type="number" min={1} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Материалы"
          name="materials"
          rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Выберете варианты"
            onChange={(values) => {
              form.setFieldValue('materials', values);
            }}
            options={materials.map((material) => ({
              label: material.title,
              value: material.id,
            }))}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Оформление"
          name="framing_types"
          rules={[{ required: true, message: 'Поле не может быть пустым' }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Выберете вариант оформления"
            onChange={(values) => {
              form.setFieldValue('framing_types', values);
            }}
            options={framingTypes.map((type) => ({
              label: type.title,
              value: type.id,
            }))}
          />
        </Form.Item>
        <Form.Item<FieldType> label="Изображения" name="images">
          <ImageUploader
            images={form.getFieldValue('images')}
            setImages={(images) => {
              form.setFieldValue('images', images);
            }}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Продано"
          name="is_sold"
          rules={[{ required: true, message: REQUIRED_FIELD_ERROR }]}
        >
          <Switch />
        </Form.Item>
      </Form>
    );
  }
);

export default TitleForm;
