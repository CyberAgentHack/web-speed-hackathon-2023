import { gql } from '@apollo/client';

import type { FeatureItem } from '../../model/feature_item';
import type { FeatureSection } from '../../model/feature_section';
import type { LimitedTimeOffer } from '../../model/limited_time_offer';
import type { MediaFile } from '../../model/media_file';
import type { Order } from '../../model/order';
import type { Product } from '../../model/product';
import type { ProductMedia } from '../../model/product_media';
import type { Profile } from '../../model/profile';
import type { Recommendation } from '../../model/recommendation';
import type { Review } from '../../model/review';
import type { ShoppingCartItem } from '../../model/shopping_cart_item';
import type { User } from '../../model/user';

export const MediaFileFragment = gql`
  fragment MediaFileFragment on MediaFile {
    id
    filename
  }
`;
export type MediaFileFragmentResponse = Pick<MediaFile, 'id' | 'filename'>;

export const LimitedTimeOfferFragment = gql`
  fragment LimitedTimeOfferFragment on LimitedTimeOffer {
    id
    price
    startDate
    endDate
  }
`;
export type LimitedTimeOfferFragmentResponse = Pick<LimitedTimeOffer, 'id' | 'price' | 'startDate' | 'endDate'>;

export const ProductMediaFragment = gql`
  ${MediaFileFragment}

  fragment ProductMediaFragment on ProductMedia {
    id
    isThumbnail
    file {
      ...MediaFileFragment
    }
  }
`;
export type ProductMediaFragmentResponse = Pick<ProductMedia, 'id' | 'isThumbnail'> & {
  file: MediaFileFragmentResponse;
};

export const ProductFragment = gql`
  ${ProductMediaFragment}
  ${LimitedTimeOfferFragment}

  fragment ProductFragment on Product {
    id
    name
    price
    description
    media {
      ...ProductMediaFragment
    }
    offers {
      ...LimitedTimeOfferFragment
    }
  }
`;
export type ProductFragmentResponse = Pick<Product, 'id' | 'name' | 'price' | 'description'> & {
  media: ProductMediaFragmentResponse[];
  offers: LimitedTimeOfferFragmentResponse[];
};

export const ProfileFragment = gql`
  ${MediaFileFragment}

  fragment ProfileFragment on Profile {
    id
    name
    avatar {
      ...MediaFileFragment
    }
  }
`;
export type ProfileFragmentResponse = Pick<Profile, 'id' | 'name'> & {
  avatar: MediaFileFragmentResponse;
};

export const UserFragment = gql`
  ${ProfileFragment}

  fragment UserFragment on User {
    id
    email
    profile {
      ...ProfileFragment
    }
  }
`;
export type UserFragmentResponse = Pick<User, 'id' | 'email'> & {
  profile: ProfileFragmentResponse;
};

export const ReviewFragment = gql`
  ${UserFragment}

  fragment ReviewFragment on Review {
    id
    postedAt
    comment
    user {
      ...UserFragment
    }
  }
`;
export type ReviewFragmentResponse = Pick<Review, 'id' | 'postedAt' | 'comment'> & {
  user: UserFragmentResponse;
};

export const ProductReviewFragment = gql`
  ${ReviewFragment}

  fragment ProductReviewFragment on Product {
    reviews {
      ...ReviewFragment
    }
  }
`;
export type ProductReviewFragmentResponse = {
  reviews: ReviewFragmentResponse[];
};

export const ProductWithReviewFragment = gql`
  ${ProductFragment}
  ${ReviewFragment}

  fragment ProductWithReviewFragment on Product {
    ...ProductFragment
    reviews {
      ...ReviewFragment
    }
  }
`;
export type ProductWithReviewFragmentResponse = ProductFragmentResponse & {
  reviews: ReviewFragmentResponse[];
};

export const RecommendationFragment = gql`
  ${ProductFragment}

  fragment RecommendationFragment on Recommendation {
    id
    product {
      ...ProductFragment
    }
  }
`;
export type RecommendationFragmentResponse = Pick<Recommendation, 'id'> & {
  product: ProductFragmentResponse;
};

export const ShoppingCartItemFragment = gql`
  ${ProductWithReviewFragment}

  fragment ShoppingCartItemFragment on ShoppingCartItem {
    id
    amount
    product {
      ...ProductWithReviewFragment
    }
  }
`;
export type ShoppingCartItemFragmentResponse = Pick<ShoppingCartItem, 'id' | 'amount'> & {
  product: ProductWithReviewFragmentResponse;
};

export const OrderFragment = gql`
  ${ShoppingCartItemFragment}

  fragment OrderFragment on Order {
    id
    zipCode
    address
    isOrdered
    items {
      ...ShoppingCartItemFragment
    }
  }
`;
export type OrderFragmentResponse = Pick<Order, 'id' | 'zipCode' | 'address' | 'isOrdered'> & {
  items: ShoppingCartItemFragmentResponse[];
};

export const AuthUserFragment = gql`
  ${UserFragment}
  ${ReviewFragment}
  ${OrderFragment}

  fragment AuthUserFragment on User {
    ...UserFragment
    reviews {
      ...ReviewFragment
    }
    orders {
      ...OrderFragment
    }
  }
`;
export type AuthUserFragmentResponse = UserFragmentResponse & {
  reviews: ReviewFragmentResponse[];
  orders: OrderFragmentResponse[];
};

export const FeatureItemFragment = gql`
  ${ProductFragment}

  fragment FeatureItemFragment on FeatureItem {
    id
    product {
      ...ProductFragment
    }
  }
`;
export type FeatureItemFragmentResponse = Pick<FeatureItem, 'id'> & {
  product: ProductFragmentResponse;
};

export const FeatureSectionFragment = gql`
  ${FeatureItemFragment}

  fragment FeatureSectionFragment on FeatureSection {
    id
    title
    items {
      ...FeatureItemFragment
    }
  }
`;
export type FeatureSectionFragmentResponse = Pick<FeatureSection, 'id' | 'title'> & {
  items: FeatureItemFragmentResponse[];
};
