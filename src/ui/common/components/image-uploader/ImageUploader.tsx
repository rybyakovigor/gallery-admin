// Core
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';

// Types
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { AppFile } from '~/domain/files/file.schema';

// Stores
import filesStore from '~/domain/files/files.store';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface PropsType {
  images: AppFile[];
  setImages: (images: AppFile[]) => void;
}

const mapFile = (file: AppFile): UploadFile => ({ uid: file.id, name: file.title, status: 'done', url: file.path });

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(new Error(`FileReader error: ${error.type}`));
  });

const ImageUploader = ({ images, setImages }: PropsType): React.ReactElement => {
  const { upload } = filesStore;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList(images.map(mapFile));
  }, [images]);

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Добавить</div>
    </button>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        style={{ width: '100%' }}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={async (file) => {
          const index = images.findIndex((f) => f.id === file.uid);
          const newImages = [...images];
          newImages.splice(index, 1);
          setImages(newImages);
        }}
        customRequest={async (options) => {
          const { file, onProgress, onSuccess, onError } = options;
          try {
            const f = await upload(file as File, onProgress);
            setImages([...images, f]);
            if (onSuccess) {
              onSuccess({ response: 'success' });
            }
          } catch (error) {
            if (onError) {
              onError(error as Error, { response: 'error' });
            }
          }
        }}
      >
        {uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUploader;
