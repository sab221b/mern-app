import React, { useState } from 'react';
import Login from '../pages/login/Login';
import Landing from '../pages/landing/LandingPage';

function Layout() {
  const isAuthenticated = useState(false);

  return (
    <>
      {isAuthenticated ? <Landing /> : <Login />}
    </>
  );
}

export default Layout;
