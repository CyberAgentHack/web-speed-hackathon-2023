import classNames from 'classnames';
import type { FC } from 'react';

import { Anchor } from '../Anchor';

import * as styles from './PrimaryAnchor.styles';

type Size = 'base' | 'lg';
type Props = {
  size: Size;
  href: string;
  children: string;
};

export const PrimaryAnchor: FC<Props> = ({ children, href, size }) => (
  <Anchor href={href}>
    <span
      className={classNames(styles.inner(), {
        [styles.container__lg()]: size === 'lg',
        [styles.container__base()]: size === 'base',
      })}
    >
      {children}
    </span>
  </Anchor>
);
