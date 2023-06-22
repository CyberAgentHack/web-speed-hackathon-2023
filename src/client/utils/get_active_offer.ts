import type { LimitedTimeOfferFragmentResponse } from '../graphql/fragments';

export function getActiveOffer(
  offers: LimitedTimeOfferFragmentResponse[],
): LimitedTimeOfferFragmentResponse | undefined {
  const activeOffer = offers.find((offer) => {
    const now = new Date();
    const startDate = new Date(offer.startDate);
    const endDate = new Date(offer.endDate);

    return startDate <= now && now <= endDate;
  });

  return activeOffer;
}
