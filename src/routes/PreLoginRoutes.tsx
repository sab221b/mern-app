import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const LoginPage = lazy(() => import(/* webpackChunkName: 'LoginPage' */'../pages/user/Login'));

const PreLoginRoutes = () => {
  return (
    <Suspense >
      <Routes>
        <Route path="/" element={<Navigate to='/login' replace />} />
        <Route path={'/login'} element={<LoginPage />} />
      </Routes>
    </Suspense>
  )
}


export default PreLoginRoutes;