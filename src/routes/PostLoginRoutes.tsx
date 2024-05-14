import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const HomePage = lazy(() => import(/* webpackChunkName: 'HomePage' */'../pages/home-page/HomePage'));
const ProfilePage = lazy(() => import(/* webpackChunkName: 'ProfilePage' */'../pages/profile-page/ProfilePage'));
const UserListPage = lazy(() => import(/* webpackChunkName: 'UserList' */'../pages/userlist/UserListPage'));

const PostLoginRoutes = () => {
  console.log('inside post login routes');
  return (

    <Suspense fallback={<></>}>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route path='/user-list' element={<UserListPage />} />
      </Routes>
    </Suspense>
  )
}


export default PostLoginRoutes;
