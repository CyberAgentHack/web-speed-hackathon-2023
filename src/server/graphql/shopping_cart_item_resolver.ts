import { ShoppingCartItem } from '../../model/shopping_cart_item';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const shoppingCartItemResolver: GraphQLModelResolver<ShoppingCartItem> = {
  product: async (parent) => {
    const item = await dataSource.manager.findOneOrFail(ShoppingCartItem, {
      relations: {
        product: true,
      },
      where: {
        id: parent.id,
      },
    });

    return item.product;
  },
};
