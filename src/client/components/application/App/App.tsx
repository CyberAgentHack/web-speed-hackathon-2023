import type { FC } from 'react';

import { SignInModal } from '../../modal/SignInModal';
import { SignUpModal } from '../../modal/SignUpModal';
import { Providers } from '../Providers';
import { Routes } from '../Routes';

export const App: FC = () => (
  <Providers>
    <Routes />
    <SignInModal />
    <SignUpModal />
  </Providers>
);
