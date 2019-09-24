import { lazy } from 'react';

const CameraRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/console/cameras',
  },
];

export default CameraRoutes;
