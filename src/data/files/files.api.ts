// Http client
import httpClient from '~/infra/http/client';
import { AxiosRequestConfig } from 'axios';

// Types
import { AppFile } from '~/domain/files/file.schema';

class FilesApi {
  private readonly path = 'files';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async upload(file: File, onProgress?: (props: any) => void): Promise<AppFile> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress({ percent: (event.loaded / event.total) * 100 });
        }
      },
    };
    const { data } = await httpClient.post<AppFile>(`${this.path}`, formData, config);

    return data;
  }

  public async delete(id: string): Promise<void> {
    const { data } = await httpClient.delete<void>(`${this.path}/${id}`);

    return data;
  }
}

const filesApi = new FilesApi();

export default filesApi;
