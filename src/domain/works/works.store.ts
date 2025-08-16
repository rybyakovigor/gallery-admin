import { makeAutoObservable } from 'mobx';

import worksApi from '~/data/works/works.api';

import { CreateWork, UpdateWork, Work } from './work.schema';

class WorksStore {
  public works: Work[] = [];

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public async fetchWorks(): Promise<void> {
    try {
      const works = await worksApi.getAll();
      this.works = works;
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при загрузке работы');
    }
  }

  public findWork(id: string): Work | null {
    const work = this.works.find((predicate) => predicate.id === id);
    return work ?? null;
  }

  public async createWork(body: CreateWork): Promise<void> {
    try {
      const createdWork = await worksApi.create(body);
      this.works = [...this.works, createdWork];
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при создании работы');
    }
  }

  public async updateWork(body: UpdateWork): Promise<void> {
    try {
      const updatedMaterial = await worksApi.update(body.id, body);
      const index = this.works.findIndex((item) => item.id === body.id);
      this.works = this.works.map((item, i) => (i === index ? updatedMaterial : item));
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при обновлении работы');
    }
  }

  public async deleteWork(id: string): Promise<void> {
    try {
      await worksApi.delete(id);
      this.works = this.works.filter((item) => item.id !== id);
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при удалении работы');
    }
  }
}

export type WorksStoreType = WorksStore;

const worksStore = new WorksStore();
export default worksStore;
