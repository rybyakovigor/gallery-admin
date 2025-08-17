import { makeAutoObservable } from 'mobx';

import feedbackApi from '~/data/feedback/feedback.api';

import { Feedback } from './feedback.schema';

class FeedbackStore {
  public feedback: Feedback[] = [];

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public async fetchFeedback(): Promise<void> {
    try {
      const feedback = await feedbackApi.getAll();
      // eslint-disable-next-line sonarjs/no-misleading-array-reverse
      this.feedback = feedback.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при загрузке обратной связи');
    }
  }
}

export type FeedbackStoreType = FeedbackStore;

const feedbackStore = new FeedbackStore();
export default feedbackStore;
