import type { FC } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { ProductCard } from '../ProductCard';

import * as styles from './ProductGridList.styles';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductGridList: FC<Props> = ({ featureSection }) => {
  const products = featureSection.items.map((item) => item.product);

  return (
    <ul className={styles.cardList()}>
      {products.map((product) => {
        return (
          <li key={product.id} className={styles.cardListItem()}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};
