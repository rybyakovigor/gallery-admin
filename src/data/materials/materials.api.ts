// Http client
import httpClient from '~/infra/http/client';

// Types
import { CreateMaterial, Material, UpdateMaterial } from '~/domain/materials/material.schema';

class MaterialsApi {
  private readonly path = 'materials';
  public async getAll(): Promise<Material[]> {
    const { data } = await httpClient.get<Material[]>(`${this.path}`);

    return data;
  }

  public async delete(id: string): Promise<void> {
    const { data } = await httpClient.delete<void>(`${this.path}/${id}`);

    return data;
  }

  public async create(body: CreateMaterial): Promise<Material> {
    const { data } = await httpClient.post<Material>(`${this.path}`, body);

    return data;
  }

  public async update(id: string, body: UpdateMaterial): Promise<Material> {
    const { data } = await httpClient.put<Material>(`${this.path}/${id}`, body);

    return data;
  }
}

const materialsApi = new MaterialsApi();

export default materialsApi;
