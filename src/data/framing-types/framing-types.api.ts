// Http client
import httpClient from '~/infra/http/client';

// Types
import { CreateOrUpdateFramingType, FramingType } from './framing-type.type';

class FramingTypesApi {
  private readonly path = 'framing-types';
  public async getAll(): Promise<FramingType[]> {
    const { data } = await httpClient.get<FramingType[]>(`${this.path}`);

    return data;
  }

  public async delete(id: string): Promise<void> {
    const { data } = await httpClient.delete<void>(`${this.path}/${id}`);

    return data;
  }

  public async create(body: CreateOrUpdateFramingType): Promise<FramingType> {
    const { data } = await httpClient.post<FramingType>(`${this.path}`, body);

    return data;
  }

  public async update(id: string, body: CreateOrUpdateFramingType): Promise<FramingType> {
    const { data } = await httpClient.put<FramingType>(`${this.path}/${id}`, body);

    return data;
  }
}

const framingTypesApi = new FramingTypesApi();

export default framingTypesApi;
