import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';
import { GetRecommendationsQuery } from '../graphql/queries';

export const useRecommendation = () => {
  const recommendationsResult = useSuspenseQuery<GetRecommendationsQueryResponse>(GetRecommendationsQuery);

  const hour = new Date().getHours();
  const recommendations = recommendationsResult?.data?.recommendations;

  if (recommendations == null) {
    return { recommendation: undefined };
  }

  const recommendation = recommendations[hour % recommendations.length];
  return { recommendation };
};
