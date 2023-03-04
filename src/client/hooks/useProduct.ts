import { useQuery } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

import type { GetProductDetailsQueryResponse } from '../graphql/queries';
import { GetProductDetailsQuery } from '../graphql/queries';

export const useProduct = (productId: number) => {
  const handleError = useErrorHandler();
  const productResult = useQuery<GetProductDetailsQueryResponse>(GetProductDetailsQuery, {
    onError: handleError,
    variables: {
      productId,
    },
  });

  const product = productResult.data?.product;

  return { product };
};
