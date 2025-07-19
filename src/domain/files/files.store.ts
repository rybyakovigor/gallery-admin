import { makeAutoObservable } from 'mobx';

import filesApi from '~/data/files/files.api';

import { AppFile } from './file.schema';

class FilesStore {
  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async upload(file: File, onProgress?: (props?: any) => void): Promise<AppFile> {
    try {
      return await filesApi.upload(file, onProgress);
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при загрузке файла');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      return await filesApi.delete(id);
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при удалении файла');
    }
  }
}

export type FilesStoreType = FilesStore;

const filesStore = new FilesStore();
export default filesStore;
