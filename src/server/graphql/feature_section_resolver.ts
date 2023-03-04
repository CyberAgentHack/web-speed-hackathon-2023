import { FeatureItem } from '../../model/feature_item';
import type { FeatureSection } from '../../model/feature_section';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const featureSectionResolver: GraphQLModelResolver<FeatureSection> = {
  items: (parent) => {
    return dataSource.manager.find(FeatureItem, {
      relations: {
        product: true,
      },
      where: {
        section: parent,
      },
    });
  },
};
