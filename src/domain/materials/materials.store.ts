import { makeAutoObservable } from 'mobx';

import materialsApi from '~/data/materials/materials.api';

import { CreateMaterial, Material, UpdateMaterial } from './material.schema';

class MaterialsStore {
  public materials: Material[] = [];

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public async fetchMaterials(): Promise<void> {
    try {
      const materials = await materialsApi.getAll();
      this.materials = materials;
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при загрузке материалов');
    }
  }

  public findMaterial(id: string): Material | null {
    const framingType = this.materials.find((predicate) => predicate.id === id);
    return framingType ?? null;
  }

  public async createMaterial(material: CreateMaterial): Promise<void> {
    try {
      const createdMaterial = await materialsApi.create(material);
      this.materials = [...this.materials, createdMaterial];
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при создании материала');
    }
  }

  public async updateMaterial(material: UpdateMaterial): Promise<void> {
    try {
      const updatedMaterial = await materialsApi.update(material.id, material);
      const index = this.materials.findIndex((item) => item.id === material.id);
      this.materials = this.materials.map((item, i) => (i === index ? updatedMaterial : item));
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при обновлении материала');
    }
  }

  public async deleteMaterial(id: string): Promise<void> {
    try {
      await materialsApi.delete(id);
      this.materials = this.materials.filter((item) => item.id !== id);
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при удалении материала');
    }
  }
}

export type MaterialsStoreType = MaterialsStore;

const materialsStore = new MaterialsStore();
export default materialsStore;
