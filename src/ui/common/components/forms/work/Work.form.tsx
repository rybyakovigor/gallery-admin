import { useRef } from 'react';

import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { OrderList } from 'primereact/orderlist';
import { Controller, UseFormReturn } from 'react-hook-form';

import filesStore from '~/domain/files/files.store';
import { FramingType } from '~/domain/framing-types/framing-types.schema';
import { Material } from '~/domain/materials/material.schema';
import { useRequest } from '~/domain/shared/hooks/useRequest';
import { Work } from '~/domain/works/work.schema';

import { WorkFormData } from './work.form.validations';

interface Props {
  form: UseFormReturn<WorkFormData>;
  framingTypes: Material[];
  materials: FramingType[];
  images: Work['images'];
}

const WorkForm = ({ form, framingTypes, images, materials }: Props): React.ReactElement => {
  const {
    formState: { errors },
    register,
  } = form;

  const { isLoading, request } = useRequest();

  const { upload } = filesStore;

  const uploadRef = useRef<FileUpload>(null);

  return (
    <form className="flex gap-2">
      <div className="flex flex-column gap-3 w-6">
        <div className="flex flex-column gap-1">
          <label htmlFor="title">Название</label>
          <InputText autoComplete="off" id="title" {...register('title')} className={errors.title ? 'p-invalid' : ''} />
          {errors.title && <small className="p-error">{errors.title?.message}</small>}
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="title">Описание</label>
          <InputTextarea
            autoResize
            autoComplete="off"
            id="description"
            {...register('description')}
            className={errors.description ? 'p-invalid' : ''}
            cols={30}
            rows={5}
          />
          {errors.description && <small className="p-error">{errors.description?.message}</small>}
        </div>

        <div className="flex gap-2">
          <div>
            <label htmlFor="width">Ширина</label>
            <InputNumber
              id="width"
              {...register('width')}
              showButtons
              className={errors.width ? 'p-invalid' : ''}
              max={100}
              min={0}
              mode="decimal"
              value={form.getValues('width')}
              onChange={(event) => form.setValue('width', event.value!)}
            />
            {errors.width && <small className="p-error">{errors.width?.message}</small>}
          </div>

          <div>
            <label htmlFor="height">Высота</label>
            <InputNumber
              id="height"
              {...register('height')}
              showButtons
              className={errors.height ? 'p-invalid' : ''}
              max={100}
              min={0}
              mode="decimal"
              value={form.getValues('height')}
              onChange={(event) => form.setValue('height', event.value!)}
            />
            {errors.height && <small className="p-error">{errors.height?.message}</small>}
          </div>

          <div>
            <label htmlFor="price">Цена</label>
            <InputNumber
              id="price"
              {...register('price')}
              className={errors.title ? 'p-invalid' : ''}
              currency="RUB"
              locale="ru-RU"
              max={999999}
              min={0}
              mode="currency"
              value={form.getValues('price')}
              onChange={(event) => form.setValue('price', event.value!)}
            />
            {errors.price && <small className="p-error">{errors.price?.message}</small>}
          </div>
        </div>

        <Controller
          control={form.control}
          name="materials"
          render={() => (
            <div className="flex flex-column gap-1">
              <label htmlFor="materials">Материалы</label>
              <div className="relative">
                <MultiSelect
                  filter
                  className="w-full"
                  display="chip"
                  id="materials"
                  optionLabel="title"
                  options={materials}
                  placeholder="Выберете варианты..."
                  value={form.getValues('materials')}
                  onChange={(e) => form.setValue('materials', e.value!)}
                />
              </div>
              {errors.materials && <small className="p-error">{errors.materials?.message}</small>}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="framing_types"
          render={() => (
            <div className="flex flex-column gap-1">
              <label htmlFor="framing_types">Варианты оформления</label>
              <div className="relative">
                <MultiSelect
                  filter
                  className="w-full"
                  display="chip"
                  id="framing_types"
                  optionLabel="title"
                  options={framingTypes}
                  placeholder="Выберете варианты..."
                  value={form.getValues('framing_types')}
                  onChange={(e) => form.setValue('framing_types', e.value!)}
                />
              </div>
              {errors.framing_types && <small className="p-error">{errors.framing_types?.message}</small>}
            </div>
          )}
        />

        <div className="flex gap-2">
          <Controller
            control={form.control}
            name="is_sold"
            render={() => (
              <div className="flex align-items-center gap-1">
                <label htmlFor="is_sold">Продано</label>
                <InputSwitch
                  checked={form.getValues('is_sold')}
                  id="is_sold"
                  {...register('is_sold')}
                  className={errors.is_sold ? 'p-invalid' : ''}
                  onChange={(event) => form.setValue('is_sold', event.value!)}
                />
                {errors.is_sold && <small className="p-error">{errors.is_sold?.message}</small>}
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="is_active"
            render={() => (
              <div className="flex align-items-center gap-1">
                <label htmlFor="is_active">Показывать</label>
                <InputSwitch
                  checked={form.getValues('is_active')}
                  id="is_active"
                  {...register('is_active')}
                  className={errors.is_active ? 'p-invalid' : ''}
                  onChange={(event) => form.setValue('is_active', event.value!)}
                />
                {errors.is_active && <small className="p-error">{errors.is_active?.message}</small>}
              </div>
            )}
          />
        </div>
      </div>

      <Divider layout="vertical" />

      <div className="flex flex-column gap-3 w-full">
        <Controller
          control={form.control}
          name="images"
          render={() => (
            <OrderList
              dragdrop
              dataKey="id"
              header="Изображения"
              itemTemplate={(image) => {
                return (
                  <div className="flex flex-wrap p-2 align-items-center gap-3">
                    <Image preview alt="" src={image.path} width="200" />
                    <Button
                      outlined
                      rounded
                      aria-label="Cancel"
                      icon="pi pi-times"
                      severity="danger"
                      onMouseDown={() => {
                        form.setValue(
                          'images',
                          // eslint-disable-next-line sonarjs/no-nested-functions
                          images.filter((i) => i.id !== image.id)
                        );
                      }}
                    />
                  </div>
                );
              }}
              value={images}
              onChange={(e) => form.setValue('images', e.value)}
            />
          )}
        />

        <FileUpload
          ref={uploadRef}
          customUpload
          accept="image/*"
          chooseLabel="Добавить фото"
          className="align-self-center"
          disabled={isLoading}
          maxFileSize={1000000}
          mode="basic"
          uploadHandler={async (event) => {
            await Promise.allSettled(
              event.files.map(async (file) => {
                request(upload, file, (uploadedFile) => {
                  form.setValue('images', [...images, uploadedFile]);
                  uploadRef.current?.setFiles([]);
                });
              })
            );
          }}
        />
      </div>
    </form>
  );
};

export default WorkForm;
