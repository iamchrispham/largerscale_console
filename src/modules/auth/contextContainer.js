import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';

import { AuthContextProvider } from './authContext';
import { AUTH_PAGE, LOGGED_IN_HOME } from '../../config';
import { authenticate as callAuth } from '../../shared/services/auth';
import ErrorContext from '../../shared/modules/error/context';

const AuthContextContainer = ({ history, children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    loading: false,
  });
  const errorContext = useContext(ErrorContext);

  const authenticate = async (email, password) => {
    setState({ isAuthenticated: false, loading: true });
    try {
      if (state.isAuthenticated === 'false') {
        const user = await callAuth({ email, password });
        console.log(`User.data: ${user.data}, emailvar: ${email}, pwvar: ${password}, token:${user.data.token}, isAuth: ${state.isAuthenticated}`)
        localStorage.setItem('user', JSON.stringify(user.data));
        localStorage.setItem('token', user.data.token);
        setState({ isAuthenticated: true, loading: false });
        history.push(LOGGED_IN_HOME);
      }
    } catch (e) {
      errorContext.setError(e, true);
      setState({ isAuthenticated: false, loading: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedSite');
    setState({ isAuthenticated: false });
    history.push(AUTH_PAGE);
  };

  const checkAuthentication = () => !!localStorage.getItem('user') && !!localStorage.getItem('token');

  return (
    <AuthContextProvider value={{ isAuthenticated: state.isAuthenticated, authenticate, logout, checkAuthentication }}>
      {children}
    </AuthContextProvider>
  );
};

export default withRouter(AuthContextContainer);
