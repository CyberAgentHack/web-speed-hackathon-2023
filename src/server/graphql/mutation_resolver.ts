import { Temporal } from '@js-temporal/polyfill';
import * as bcrypt from 'bcrypt';
import type { GraphQLFieldResolver } from 'graphql';

import { Order } from '../../model/order';
import { Profile } from '../../model/profile';
import { Review } from '../../model/review';
import { ShoppingCartItem } from '../../model/shopping_cart_item';
import { User } from '../../model/user';
import type { Context } from '../context';
import { dataSource } from '../data_source';

type MutationResolver = {
  signin: GraphQLFieldResolver<unknown, Context, { email: string; password: string }, Promise<boolean>>;
  signup: GraphQLFieldResolver<unknown, Context, { email: string; name: string; password: string }, Promise<boolean>>;
  sendReview: GraphQLFieldResolver<unknown, Context, { productId: number; comment: string }, Promise<boolean>>;
  updateItemInShoppingCart: GraphQLFieldResolver<
    unknown,
    Context,
    { productId: number; amount: number },
    Promise<boolean>
  >;
  orderItemsInShoppingCart: GraphQLFieldResolver<
    unknown,
    Context,
    { zipCode: string; address: string },
    Promise<boolean>
  >;
};

export const mutationResolver: MutationResolver = {
  orderItemsInShoppingCart: async (_parent, args, { session }) => {
    if (session['userId'] == null) {
      throw new Error('Authentication required.');
    }

    await dataSource.manager.update(
      Order,
      {
        isOrdered: false,
        user: {
          id: session['userId'],
        },
      },
      {
        address: args.address,
        isOrdered: true,
        zipCode: args.zipCode,
      },
    );

    return true;
  },
  sendReview: async (_parent, args, { session }) => {
    if (session['userId'] == null) {
      throw new Error('Authentication required.');
    }

    const postedAt = Temporal.Now.instant().toString({ timeZone: Temporal.TimeZone.from('UTC') });

    await dataSource.manager.save(
      dataSource.manager.create(Review, {
        comment: args.comment,
        postedAt,
        product: {
          id: args.productId,
        },
        user: {
          id: session['userId'],
        },
      }),
    );

    return true;
  },
  signin: async (_parent: unknown, args, { session }) => {
    const user = await dataSource.manager.findOneOrFail(User, {
      where: {
        email: args.email,
      },
    });

    if ((await bcrypt.compare(args.password, user.password)) !== true) {
      throw new Error('Auth error.');
    }

    session['userId'] = user.id;
    return true;
  },
  signup: async (_parent, args, { session }) => {
    const user = await dataSource.manager.save(
      dataSource.manager.create(User, {
        email: args.email,
        password: await bcrypt.hash(args.password, 10),
      }),
    );
    await dataSource.manager.save(
      dataSource.manager.create(Profile, {
        avatar: { id: 1 },
        name: args.name,
        user,
      }),
    );
    session['userId'] = user.id;
    return true;
  },
  updateItemInShoppingCart: async (_parent, args, { session }) => {
    if (session['userId'] == null) {
      throw new Error('Authentication required.');
    }

    const order = await dataSource.manager
      .findOneOrFail(Order, {
        where: {
          isOrdered: false,
          user: {
            id: session['userId'],
          },
        },
      })
      .catch(() => {
        return dataSource.manager.save(
          dataSource.manager.create(Order, {
            address: '',
            isOrdered: false,
            items: [],
            user: {
              id: session['userId'],
            },
            zipCode: '',
          }),
        );
      });

    if (args.amount <= 0) {
      await dataSource.manager.delete(ShoppingCartItem, {
        order: {
          id: order.id,
        },
        product: {
          id: args.productId,
        },
      });

      return true;
    }

    await dataSource.manager.upsert(
      ShoppingCartItem,
      {
        amount: args.amount,
        order: {
          id: order.id,
        },
        product: {
          id: args.productId,
        },
      },
      {
        conflictPaths: ['order.id', 'product.id'],
      },
    );

    return true;
  },
};
