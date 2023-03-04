import { Recommendation } from '../../model/recommendation';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const recommendationResolver: GraphQLModelResolver<Recommendation> = {
  product: async (parent) => {
    const recommendation = await dataSource.manager.findOneOrFail(Recommendation, {
      relations: {
        product: true,
      },
      where: { id: parent.id },
    });

    return recommendation.product;
  },
};
