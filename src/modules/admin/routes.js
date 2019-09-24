import { lazy } from 'react';

const UsersRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/console/admin/:type?',
  },
  // {
  //   Component: lazy(() => import('./admin/container')),
  //   path: '/console/admin/admin',
  // },
  // {
  //   Component: lazy(() => import('./organization/container')),
  //   path: '/console/admin/organization',
  // },
  // {
  //   Component: lazy(() => import('./license/container')),
  //   path: '/console/admin/license',
  // },
];

export default UsersRoutes;
