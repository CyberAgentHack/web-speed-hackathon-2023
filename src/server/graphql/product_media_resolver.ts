import { ProductMedia } from '../../model/product_media';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const productMediaResolver: GraphQLModelResolver<ProductMedia> = {
  file: async (parent) => {
    const productMedia = await dataSource.manager.findOneOrFail(ProductMedia, {
      relations: {
        file: true,
      },
      where: { id: parent.id },
    });

    return productMedia.file;
  },
};
