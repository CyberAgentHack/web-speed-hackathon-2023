import type { FC } from 'react';
import { memo } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { Icon } from '../../foundation/Icon';
import { OutlineButton } from '../../foundation/OutlineButton';
import { PrimaryAnchor } from '../../foundation/PrimaryAnchor';
import { PrimaryButton } from '../../foundation/PrimaryButton';

import * as styles from './ProductPurchaseSection.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
  amountInCart: number;
  isAuthUser: boolean;
  onUpdateCartItem: (productId: number, count: number) => void;
  onOpenSignInModal: () => void;
};

export const ProductPurchaseSection: FC<Props> = memo(
  ({ amountInCart, isAuthUser, onOpenSignInModal, onUpdateCartItem, product }) => {
    if (product === undefined) {
      return null;
    }

    if (!isAuthUser) {
      return (
        <div className={styles.container()}>
          <div className={styles.signInWrapper()}>
            <span className={styles.signIn()}>購入にはログインが必要です</span>
            <PrimaryButton onClick={() => onOpenSignInModal()} size="sm">
              ログイン
            </PrimaryButton>
          </div>
        </div>
      );
    }

    if (amountInCart === 0) {
      return (
        <div className={styles.container()}>
          <PrimaryButton onClick={() => onUpdateCartItem(product.id, 1)} size="sm">
            カートに追加
          </PrimaryButton>
        </div>
      );
    }

    return (
      <div className={styles.container()}>
        <p className={styles.amount()}>
          <span className={styles.checkIcon()}>
            <Icon color="#3BA175" height={18} type="FaCheckCircle" width={18} />
          </span>
          <span>{amountInCart}個 カートに追加済み</span>
        </p>
        <div className={styles.actionButtonList()}>
          <PrimaryAnchor href="/order" size="base">
            購入手続きへ
          </PrimaryAnchor>
          <OutlineButton onClick={() => onUpdateCartItem(product.id, amountInCart + 1)} size="lg">
            カートに追加
          </OutlineButton>
        </div>
      </div>
    );
  }
);

ProductPurchaseSection.displayName = 'ProductPurchaseSection';
