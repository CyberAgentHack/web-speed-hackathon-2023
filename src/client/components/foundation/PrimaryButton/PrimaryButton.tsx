import classnames from 'classnames';
import type { ComponentProps, FC } from 'react';

import * as styles from './PrimaryButton.styles';

type Size = 'sm' | 'base' | 'lg';
type Props = Omit<ComponentProps<'button'>, 'className'> & {
  size: Size;
};

export const PrimaryButton: FC<Props> = ({ children, size, ...rest }) => {
  return (
    <button
      className={classnames(styles.container(), {
        [styles.container__base()]: size === 'base',
        [styles.container__lg()]: size === 'lg',
      })}
      {...rest}
    >
      {children}
    </button>
  );
};
