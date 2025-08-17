import { useContext, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import feedbackStore from '~/domain/feedback/feedback.store';
import { useRequest } from '~/domain/shared/hooks/useRequest';

import { ToastsContext } from '~/ui/providers/toasts/Toasts.provider';

import FeedbackTable from './tables/FeedbackTable';

const Feedbacks = (): React.ReactElement => {
  const { feedback, fetchFeedback } = feedbackStore;

  const { error, isLoading, request } = useRequest();

  const toasts = useContext(ToastsContext);

  useEffect(() => {
    request(fetchFeedback, {}, () => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toasts?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
      });
    }
  }, [error, toasts]);
  return (
    <section>
      <header className="flex justify-content-between align-items-center">
        <h1>Обратная связь</h1>
      </header>
      <FeedbackTable data={feedback} isLoading={isLoading} />
    </section>
  );
};

export default observer(Feedbacks);
