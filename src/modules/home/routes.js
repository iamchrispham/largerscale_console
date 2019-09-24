import { lazy } from 'react';

const AuthRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/console/home',
  },
];

export default AuthRoutes;
