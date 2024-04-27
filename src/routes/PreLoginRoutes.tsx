import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const LoginPage = lazy(() => import(/* webpackChunkName: 'LoginPage' */'../pages/login/Login'));

const PreLoginRoutes = () => {
  return (
    <Suspense >
      <Routes>
        <Route path="/" element={<Navigate to='/login' replace />} />
        <Route path={'/login'} element={<LoginPage />} />
        {/* <Route path={'/user-list'} element={<UserList />} /> */}
      </Routes>
    </Suspense>
  )
}


export default PreLoginRoutes;