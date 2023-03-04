import type { ComponentProps, FC } from 'react';

import * as styles from './Anchor.styles';

type Props = Omit<ComponentProps<'a'>, 'className'>;

export const Anchor: FC<Props> = ({ children, href, ...rest }) => (
  <a className={styles.container()} href={href} {...rest}>
    {children}
  </a>
);
