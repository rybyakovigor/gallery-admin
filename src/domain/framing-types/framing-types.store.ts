// Core
import { makeAutoObservable } from 'mobx';

// Api
import framingTypesApi from '~/data/framing-types/framing-types.api';

// Types
import { CreateFramingType, FramingType, UpdateFramingType } from './framing-types.schema';

class FramingTypesStore {
  public framingTypes: FramingType[] = [];

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public async fetchFramingTypes(): Promise<void> {
    try {
      const framingType = await framingTypesApi.getAll();
      this.framingTypes = framingType;
    } catch (error) {
      throw new Error('Ошибка при загрузке оформления');
    }
  }

  public async createFramingTypes(framingType: CreateFramingType): Promise<void> {
    try {
      const createdFramingType = await framingTypesApi.create(framingType);
      this.framingTypes = [...this.framingTypes, createdFramingType];
    } catch (error) {
      throw new Error('Ошибка при создании оформления');
    }
  }

  public async updateFramingTypes(framingType: UpdateFramingType): Promise<void> {
    try {
      const updatedFramingType = await framingTypesApi.update(framingType.id, framingType);
      const index = this.framingTypes.findIndex((item) => item.id === framingType.id);
      this.framingTypes = this.framingTypes.map((item, i) => (i === index ? updatedFramingType : item));
    } catch (error) {
      throw new Error('Ошибка при обновлении оформления');
    }
  }

  public async deleteFramingTypes(id: string): Promise<void> {
    try {
      await framingTypesApi.delete(id);
      this.framingTypes = this.framingTypes.filter((item) => item.id !== id);
    } catch (error) {
      throw new Error('Ошибка при удалении оформления');
    }
  }
}

export type FramingTypesStoreType = FramingTypesStore;

const framingTypesStore = new FramingTypesStore();
export default framingTypesStore;
