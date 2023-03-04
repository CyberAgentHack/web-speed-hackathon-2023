import { useMutation } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

import type { SendReviewMutationResponse } from '../graphql/mutations';
import { SendReviewMutation } from '../graphql/mutations';

export const useSendReview = () => {
  const handleError = useErrorHandler();
  const [sendReview] = useMutation<SendReviewMutationResponse>(SendReviewMutation, {
    onError: handleError,
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
    refetchQueries: ['GetProductDetails'],
  });

  return { sendReview };
};
