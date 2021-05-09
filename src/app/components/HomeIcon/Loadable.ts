/**
 *
 * Asynchronously loads the component for HomeIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const HomeIcon = lazyLoad(
  () => import('./index'),
  module => module.HomeIcon,
);
