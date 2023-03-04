import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/application/Layout';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductMediaListPreviewer } from '../../components/product/ProductMediaListPreviewer';
import { ProductOverview } from '../../components/product/ProductOverview';
import { ProductPurchaseSection } from '../../components/product/ProductPurchaseSeciton';
import { ReviewSection } from '../../components/review/ReviewSection';
import { useActiveOffer } from '../../hooks/useActiveOffer';
import { useAmountInCart } from '../../hooks/useAmountInCart';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useProduct } from '../../hooks/useProduct';
import { useReviews } from '../../hooks/useReviews';
import { useSendReview } from '../../hooks/useSendReview';
import { useUpdateCartItem } from '../../hooks/useUpdateCartItems';
import { useOpenModal } from '../../store/modal';
import { normalizeCartItemCount } from '../../utils/normalize_cart_item';

import * as styles from './ProductDetail.styles';

export const ProductDetail: FC = () => {
  const { productId } = useParams();

  const { product } = useProduct(Number(productId));
  const { reviews } = useReviews(product?.id);
  const { isAuthUser } = useAuthUser();
  const { sendReview } = useSendReview();
  const { updateCartItem } = useUpdateCartItem();
  const handleOpenModal = useOpenModal();
  const { amountInCart } = useAmountInCart(Number(productId));
  const { activeOffer } = useActiveOffer(product);

  const handleSubmitReview = ({ comment }: { comment: string }) => {
    sendReview({
      variables: {
        comment,
        productId: Number(productId),
      },
    });
  };

  const handleUpdateItem = (productId: number, amount: number) => {
    updateCartItem({
      variables: { amount: normalizeCartItemCount(amount), productId },
    });
  };

  return (
    <>
      {product && (
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
      )}
      <Layout>
        <WidthRestriction>
          <div className={styles.container()}>
            <section className={styles.details()}>
              <ProductMediaListPreviewer product={product} />
              <div className={styles.overview()}>
                <ProductOverview activeOffer={activeOffer} product={product} />
              </div>
              <div className={styles.purchase()}>
                <ProductPurchaseSection
                  amountInCart={amountInCart}
                  isAuthUser={isAuthUser}
                  onOpenSignInModal={() => handleOpenModal('SIGN_IN')}
                  onUpdateCartItem={handleUpdateItem}
                  product={product}
                />
              </div>
            </section>

            <section className={styles.reviews()}>
              <h2 className={styles.reviewsHeading()}>レビュー</h2>
              <ReviewSection hasSignedIn={isAuthUser} onSubmitReview={handleSubmitReview} reviews={reviews} />
            </section>
          </div>
        </WidthRestriction>
      </Layout>
    </>
  );
};
