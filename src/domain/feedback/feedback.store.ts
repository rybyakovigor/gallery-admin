// Core
import { makeAutoObservable } from 'mobx';

// Api
import feedbackApi from '~/data/feedback/feedback.api';

// Types
import { Feedback } from './feedback.schema';

class FeedbackStore {
  public feedback: Feedback[] = [];

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public async fetchFeedback(): Promise<void> {
    try {
      const feedback = await feedbackApi.getAll();
      this.feedback = feedback;
    } catch (error) {
      throw new Error('Ошибка при загрузке обратной связи');
    }
  }
}

export type FeedbackStoreType = FeedbackStore;

const feedbackStore = new FeedbackStore();
export default feedbackStore;
