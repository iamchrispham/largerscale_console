import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { AuthContext } from './modules/auth/authContext';
import AuthRoutes from './modules/auth/routes';
import HomeRoutes from './modules/home/routes';
import SiteRoutes from './modules/site/routes';
import CameraRoutes from './modules/cameras/routes';
import ExploreRoutes from './modules/explore/routes';
import AnalyticsRoutes from './modules/analytics/routes';
import UsersRoutes from './modules/admin/routes';

import NotFound from './shared/templates/notFound';
import { isAdmin, isClient, isGod, ROLES } from './shared/services/role';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const authContext = useContext(AuthContext);

  const checkPermission = () => {
    if (roles.findIndex(role => role === ROLES.CLIENT) > -1 && isClient()) return true;
    if (roles.findIndex(role => role === ROLES.GOD) > -1 && isGod()) return true;
    if (roles.findIndex(role => role === ROLES.ADMIN) > -1 && isAdmin()) return true;
    return false;
  };

  const getRedirection = () => {
    if (isGod() || isAdmin()) {
      return <Redirect to="/console/admin/users" />;
    }
    return <Redirect to="/" />;
  };

  return (
    <Route
      {...rest}
      exact
      render={props =>
        authContext.checkAuthentication() && checkPermission() ? <Component {...props} /> : getRedirection()
      }
    />
  );
};

const renderRouteFromList = (isPrivate, roles) => (item, i) => {
  const { Component } = item;
  if (isPrivate) {
    return <PrivateRoute exact key={i} path={item.path} component={Component} roles={roles} />;
  }
  return <Route exact key={i} path={item.path} component={Component} />;
};

const Routes = () => (
  <Suspense fallback="loading">
    <Switch>
      {AuthRoutes.map(renderRouteFromList())}
      {HomeRoutes.map(renderRouteFromList(true, [ROLES.CLIENT]))}
      {SiteRoutes.map(renderRouteFromList(true, [ROLES.CLIENT]))}
      {CameraRoutes.map(renderRouteFromList(true, [ROLES.CLIENT]))}
      {ExploreRoutes.map(renderRouteFromList(true, [ROLES.CLIENT]))}
      {AnalyticsRoutes.map(renderRouteFromList(true, [ROLES.CLIENT]))}
      {UsersRoutes.map(renderRouteFromList(true, [ROLES.GOD, ROLES.ADMIN]))}
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
