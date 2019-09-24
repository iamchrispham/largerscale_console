import React from 'react';
import AuthCard from './components/authCard';
import LoginForm from './components/loginForm';

const LoginPage = ({ handleSubmit }) => {
  return (
    <AuthCard>
      <LoginForm handleSubmit={handleSubmit} />
    </AuthCard>
  );
};

export default LoginPage;
