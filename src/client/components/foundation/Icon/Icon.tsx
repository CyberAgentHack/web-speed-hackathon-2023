import classNames from 'classnames';
import type { FC } from 'react';

// import * as Icons from 'react-icons/fa';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import { FaShoppingCart } from '@react-icons/all-files/fa/FaShoppingCart'
import { FaUser } from '@react-icons/all-files/fa/FaUser'
import { FaPlay } from '@react-icons/all-files/fa/FaPlay'
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle'

import * as styles from './Icon.styles';

const Icons = {FaArrowLeft, FaArrowRight, FaShoppingCart, FaUser, FaPlay,FaCheckCircle }


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
