import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import Amplify from 'aws-amplify';
import { awsCognitoConfig } from './config/aws-exports';

const isLocalhost = !!(window.location.hostname === 'localhost');

const [productionRedirectSignIn, localRedirectSignIn] =
  awsCognitoConfig.oauth.redirectSignIn.split(',');
const [productionRedirectSignOut, localRedirectSignOut] =
  awsCognitoConfig.oauth.redirectSignOut.split(',');

// use correct URI in the right env
const updatedAwsConfig = {
  ...awsCognitoConfig,
  oauth: {
    ...awsCognitoConfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};

Amplify.configure(updatedAwsConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
