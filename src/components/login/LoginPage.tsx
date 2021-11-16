import React, { useEffect, useState } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { uiConfig, firebaseApp } from '../../firebase/Config';
import './login-page.scss';

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <div className='login-page'>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebaseApp.auth()}
        className='login-container'
      />
    </div>
  );
};

export default LoginPage;
