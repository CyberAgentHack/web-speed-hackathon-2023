import classNames from 'classnames';
import type { FC, ReactNode } from 'react';

import * as styles from './ProductOfferLabel.styles';

type Size = 'base' | 'lg';
type Props = {
  children: ReactNode;
  size: Size;
};

export const ProductOfferLabel: FC<Props> = ({ children, size }) => (
  <span
    className={classNames(styles.container(), {
      [styles.container__base()]: size === 'base',
      [styles.container__lg()]: size === 'lg',
    })}
  >
    {children}
  </span>
);
