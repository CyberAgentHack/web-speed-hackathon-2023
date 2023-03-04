import classNames from 'classnames';
import type { FC } from 'react';
import * as Icons from 'react-icons/fa';

import * as styles from './Icon.styles';

type Props = {
  type: keyof typeof Icons;
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, type, width }) => {
  const Icon = Icons[type];
  return (
    <span className={classNames(type, styles.container({ color, height, width }))}>
      <Icon />
    </span>
  );
};
