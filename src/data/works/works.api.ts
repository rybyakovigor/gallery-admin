import httpClient from '~/infra/http/client';

import { AppFile } from '~/domain/files/file.schema';
import { FramingType } from '~/domain/framing-types/framing-types.schema';
import { Material } from '~/domain/materials/material.schema';
import { CreateWork, UpdateWork, Work } from '~/domain/works/work.schema';

interface WorkFromServer
  extends Pick<
    Work,
    | 'id'
    | 'title'
    | 'description'
    | 'width'
    | 'height'
    | 'price'
    | 'is_sold'
    | 'is_active'
    | 'created_at'
    | 'updated_at'
  > {
  materials: { material: Material }[];
  framing_types: { framing_type: FramingType }[];
  images: { file: AppFile }[];
}

const mapWork = (work: WorkFromServer): Work => ({
  ...work,
  materials: work.materials.map((w) => w.material),
  framing_types: work.framing_types?.map((w) => w.framing_type),
  images: work.images.map((w) => w.file),
});

class WorksApi {
  private readonly path = 'works';

  public async getAll(): Promise<Work[]> {
    const { data } = await httpClient.get<WorkFromServer[]>(`${this.path}`);

    return data.map(mapWork);
  }

  public async delete(id: string): Promise<void> {
    const { data } = await httpClient.delete<void>(`${this.path}/${id}`);

    return data;
  }

  public async create(body: CreateWork): Promise<Work> {
    const { data } = await httpClient.post<WorkFromServer>(`${this.path}`, body);

    return mapWork(data);
  }

  public async update(id: string, body: UpdateWork): Promise<Work> {
    const { data } = await httpClient.put<WorkFromServer>(`${this.path}/${id}`, body);

    return mapWork(data);
  }
}

const worksApi = new WorksApi();

export default worksApi;
