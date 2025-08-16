import httpClient from '~/infra/http/client';

import { CreateFramingType, FramingType, UpdateFramingType } from '~/domain/framing-types/framing-types.schema';

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

  public async create(body: CreateFramingType): Promise<FramingType> {
    const { data } = await httpClient.post<FramingType>(`${this.path}`, body);

    return data;
  }

  public async update(id: string, body: UpdateFramingType): Promise<FramingType> {
    const { data } = await httpClient.put<FramingType>(`${this.path}/${id}`, body);

    return data;
  }
}

const framingTypesApi = new FramingTypesApi();

export default framingTypesApi;
