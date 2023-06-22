import * as currencyFormatter from 'currency-formatter';
import type { FC } from 'react';
import { memo } from 'react';

import type { LimitedTimeOfferFragmentResponse, ProductFragmentResponse } from '../../../graphql/fragments';
import { ProductOfferLabel } from '../ProductOfferLabel';

import * as styles from './ProductOverview.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
  activeOffer: LimitedTimeOfferFragmentResponse | undefined;
};

export const ProductOverview: FC<Props> = memo(({ activeOffer, product }) => {
  if (product === undefined) {
    return null;
  }

  const renderActiveOffer = () => {
    if (activeOffer === undefined) {
      return;
    }

    const endTime = new Date(activeOffer.endDate).toLocaleString('ja-JP', { timeZone: 'UTC' })

    return (
      <div className={styles.offerLabel()}>
        <ProductOfferLabel size="lg">
          <time>{endTime}</time> までタイムセール
        </ProductOfferLabel>
      </div>
    );
  };

  return (
    <div className={styles.container()}>
      {renderActiveOffer()}
      <p className={styles.productName()}>{product.name}</p>
      <p className={styles.productDescription()}>{product.description}</p>

      <div className={styles.priceWrapper()}>
        {activeOffer !== undefined ? (
          <span className={styles.priceWithoutOffer()}>
            {currencyFormatter.format(product.price, { code: 'JPY', precision: 0 })}
          </span>
        ) : null}
        <span className={styles.price()}>
          {currencyFormatter.format(activeOffer?.price ?? product.price, { code: 'JPY', precision: 0 })}
        </span>
      </div>
    </div>
  );
});

ProductOverview.displayName = 'ProductOverview';
