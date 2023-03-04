import type { Order } from '../../model/order';
import { ShoppingCartItem } from '../../model/shopping_cart_item';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const orderResolver: GraphQLModelResolver<Order> = {
  items: async (parent) => {
    return dataSource.manager.find(ShoppingCartItem, {
      where: {
        order: parent,
      },
    });
  },
};
