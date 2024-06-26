// Core
import { makeAutoObservable } from 'mobx';

// Api
import filesApi from '~/data/files/files.api';

// Types
import { AppFile } from './file.schema';

class FilesStore {
  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async upload(file: File, onProgress?: (props?: any) => void): Promise<AppFile> {
    try {
      return filesApi.upload(file, onProgress);
    } catch (error) {
      throw new Error('Ошибка при загрузке файла');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      return filesApi.delete(id);
    } catch (error) {
      throw new Error('Ошибка при удалении файла');
    }
  }
}

export type FilesStoreType = FilesStore;

const filesStore = new FilesStore();
export default filesStore;
