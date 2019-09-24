import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { AuthContext } from './authContext';
import LoginPage from './loginPage';
import { LOGGED_IN_HOME } from '../../config';

const AuthContainer = ({ history }) => {
  const authContext = useContext(AuthContext);

  if (authContext.checkAuthentication()) {
    // TODO: Stay at current page;
    history.push(LOGGED_IN_HOME);
  }

  const handleSubmit = (email, password) => e => {
    e.preventDefault();
    if (email && password) {
      authContext.authenticate(email, password);
    }
  };
  return <LoginPage handleSubmit={handleSubmit} />;
};

export default withRouter(AuthContainer);
