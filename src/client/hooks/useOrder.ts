import { useAuthUser } from './useAuthUser';

export const useOrder = () => {
  const { authUser } = useAuthUser();
  const order = authUser?.orders.find((order) => order.isOrdered === false);

  return { order };
};
