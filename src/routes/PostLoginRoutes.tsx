import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DataTable from '../components/data-table/DataTable';

const Dashboard = lazy(() => import(/* webpackChunkName: 'Dashboard' */'../pages/dashboard/Dashboard'));
const ProfilePage = lazy(() => import(/* webpackChunkName: 'ProfilePage' */'../pages/profile-page/ProfilePage'));
const UserListPage = lazy(() => import(/* webpackChunkName: 'UserList' */'../pages/userlist/UserListPage'));
const RoleListPage = lazy(() => import(/* webpackChunkName: 'UserList' */'../pages/rolelist/RoleListPage'));

const PostLoginRoutes = () => {
  console.log('inside post login routes');
  return (

    <Suspense fallback={<></>}>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route path={'/profile/:userID'} element={<ProfilePage />} />
        <Route path='/user/list' element={<UserListPage />} />
        <Route path='/role/list' element={<RoleListPage />} />
      </Routes>
    </Suspense>
  )
}


export default PostLoginRoutes;
