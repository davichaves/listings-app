/**
 *
 * Asynchronously loads the component for ListingCard
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ListingCard = lazyLoad(
  () => import('./index'),
  module => module.ListingCard,
);
