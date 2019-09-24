import React from 'react';

const defaultAuthContext = {
  authenticate: (token, user) => {
    console.log(token, user);
  },
  checkAuthentication: () => true,
  isAuthenticated: false,
  logout: () => {},
};

export const AuthContext = React.createContext(defaultAuthContext);
export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;
