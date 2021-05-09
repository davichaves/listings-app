/**
 *
 * Asynchronously loads the component for Navigation
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Navigation = lazyLoad(
  () => import('./index'),
  module => module.Navigation,
);
