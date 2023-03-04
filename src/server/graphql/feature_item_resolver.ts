import type { FeatureItem } from '../../model/feature_item';

import type { GraphQLModelResolver } from './model_resolver';

export const featureItemResolver: GraphQLModelResolver<FeatureItem> = {
  product: (parent) => {
    return parent.product;
  },
};
