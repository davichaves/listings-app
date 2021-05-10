/**
 *
 * Asynchronously loads the component for Listings
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Listings = lazyLoad(
  () => import('./index'),
  module => module.Listings,
);
