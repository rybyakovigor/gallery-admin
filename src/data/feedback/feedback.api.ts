import httpClient from '~/infra/http/client';

import { Feedback } from '~/domain/feedback/feedback.schema';

class FeedbackApi {
  private readonly path = 'feedback';

  public async getAll(): Promise<Feedback[]> {
    const { data } = await httpClient.get<Feedback[]>(`${this.path}`);

    return data;
  }
}

const feedbackApi = new FeedbackApi();

export default feedbackApi;
