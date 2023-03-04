import type { FC } from 'react';
import * as Router from 'react-router-dom';

import { NotFound } from '../../../pages/NotFound';
import { Order } from '../../../pages/Order';
import { OrderComplete } from '../../../pages/OrderComplete';
import { ProductDetail } from '../../../pages/ProductDetail';
import { Top } from '../../../pages/Top';

import { useScrollToTop } from './hooks';

export const Routes: FC = () => {
  useScrollToTop();

  return (
    <Router.Routes>
      <Router.Route element={<Top />} path="/" />
      <Router.Route element={<ProductDetail />} path="/product/:productId" />
      <Router.Route element={<Order />} path="/order" />
      <Router.Route element={<OrderComplete />} path="/order/complete" />
      <Router.Route element={<NotFound />} path="*" />
    </Router.Routes>
  );
};
