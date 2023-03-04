import classNames from 'classnames';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { Image } from '../../foundation/Image';

import * as styles from './Footer.styles';

const FOOTER_LINK_ITEMS = ['利用規約', 'お問い合わせ', 'Q&A', '運営会社', 'オーガニックとは'] as const;

export const Footer: FC = () => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <footer className={styles.container()}>
            <ul
              className={classNames(styles.itemList(), {
                [styles.itemList__desktop()]: deviceType === DeviceType.DESKTOP,
                [styles.itemList__mobile()]: deviceType === DeviceType.MOBILE,
              })}
            >
              {FOOTER_LINK_ITEMS.map((item) => (
                <li key={item} className={styles.item()}>
                  {item}
                </li>
              ))}
            </ul>
            <NavLink to="/">
              <Image src="/icons/logo.svg" />
            </NavLink>
          </footer>
        );
      }}
    </GetDeviceType>
  );
};
