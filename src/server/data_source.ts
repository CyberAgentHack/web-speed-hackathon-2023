import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { FeatureItem } from '../model/feature_item';
import { FeatureSection } from '../model/feature_section';
import { LimitedTimeOffer } from '../model/limited_time_offer';
import { MediaFile } from '../model/media_file';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { ProductMedia } from '../model/product_media';
import { Profile } from '../model/profile';
import { Recommendation } from '../model/recommendation';
import { Review } from '../model/review';
import { ShoppingCartItem } from '../model/shopping_cart_item';
import { User } from '../model/user';

import { DATABASE_PATH } from './utils/database_paths';

export const dataSource = new DataSource({
  database: DATABASE_PATH,
  entities: [
    MediaFile,
    LimitedTimeOffer,
    Order,
    ProductMedia,
    Product,
    Profile,
    Recommendation,
    Review,
    ShoppingCartItem,
    User,
    FeatureSection,
    FeatureItem,
  ],
  logging: false,
  migrations: [],
  subscribers: [],
  synchronize: true,
  type: 'sqlite',
});
