/**
 *
 * Asynchronously loads the component for Listing
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ListingPage = lazyLoad(
  () => import('./index'),
  module => module.ListingPage,
);
