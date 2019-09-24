import React from 'react';

const AuthCard = ({ children }) => {
  return (
    <div className="login-body">
      <div className="container">
        <div className="login-wrap d-flex justify-content-center align-content-center flex-wrap">
          <div className="login-box d-flex justify-content-between">
            <div className="login-logo">
              <div className="logo-pic js-tilt" data-tilt>
                <img src="/images/logo.png" alt="Darvis" />
              </div>
              <div className="logo-text">
                <img src="/images/logo-text.png" alt="Darvis" />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
