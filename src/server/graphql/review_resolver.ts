import { Review } from '../../model/review';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const reviewResolver: GraphQLModelResolver<Review> = {
  product: async (parent) => {
    const review = await dataSource.manager.findOneOrFail(Review, {
      relations: {
        product: true,
      },
      where: { id: parent.id },
    });

    return review.product;
  },
  user: async (parent) => {
    const review = await dataSource.manager.findOneOrFail(Review, {
      relations: {
        user: true,
      },
      where: { id: parent.id },
    });

    return review.user;
  },
};
