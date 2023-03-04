import type { FC, ReactNode } from 'react';

import { Footer } from '../../navigators/Footer/Footer';
import { Header } from '../../navigators/Header/Header';

import * as styles from './Layout.styles';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <main className={styles.container()}>{children}</main>
    <Footer />
  </>
);
