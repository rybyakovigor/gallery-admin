// Core
import { makeAutoObservable } from 'mobx';

// Api
import materialsApi from '~/data/materials/materials.api';

// Types
import { Material } from './types/material';

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
      throw new Error('Ошибка при загрузке материалов');
    }
  }

  public async createMaterial(material: Material): Promise<void> {
    try {
      const createdMaterial = await materialsApi.create(material);
      this.materials = [...this.materials, createdMaterial];
    } catch (error) {
      throw new Error('Ошибка при создании материала');
    }
  }

  public async updateMaterial(material: Material): Promise<void> {
    try {
      await materialsApi.update(material.id, material);
      const index = this.materials.findIndex((item) => item.id === material.id);
      this.materials = this.materials.map((item, i) => (i === index ? material : item));
    } catch (error) {
      throw new Error('Ошибка при обновлении материала');
    }
  }

  public async deleteMaterial(id: string): Promise<void> {
    try {
      await materialsApi.delete(id);
      this.materials = this.materials.filter((item) => item.id !== id);
    } catch (error) {
      throw new Error('Ошибка при удалении материала');
    }
  }
}

export type MaterialsStoreType = MaterialsStore;

const materialsStore = new MaterialsStore();
export default materialsStore;
