import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';
import { GetFeatureSectionsQuery } from '../graphql/queries';

export const useFeatures = () => {
  const featuresResult = useSuspenseQuery<GetFeatureSectionsQueryResponse>(GetFeatureSectionsQuery);

  const features = featuresResult.data?.features;

  return { features };
};
