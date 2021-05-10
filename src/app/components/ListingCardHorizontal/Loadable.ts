/**
 *
 * Asynchronously loads the component for ListingCardHorizontal
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ListingCardHorizontal = lazyLoad(
  () => import('./index'),
  module => module.ListingCardHorizontal,
);
