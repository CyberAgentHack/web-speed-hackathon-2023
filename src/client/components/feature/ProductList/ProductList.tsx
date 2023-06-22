import type { FC } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return <ProductListSlider featureSection={featureSection} />;
          }
          case DeviceType.MOBILE: {
            return <ProductGridList featureSection={featureSection} />;
          }
        }
      }}
    </GetDeviceType>
  );
});

ProductList.displayName = 'ProductList';
