import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


const Dashboard = lazy(() => import(/* webpackChunkName: 'Dashboard' */'../pages/dashboard/Dashboard'));
const Features = lazy(() => import(/* webpackChunkName: 'Features' */'../pages/features/Features'));
const ProfilePage = lazy(() => import(/* webpackChunkName: 'ProfilePage' */'../pages/user/ProfilePage'));
const UserListPage = lazy(() => import(/* webpackChunkName: 'UserList' */'../pages/user/UserList'));
const RoleListPage = lazy(() => import(/* webpackChunkName: 'UserList' */'../pages/role/RoleList'));
const ProductListPage = lazy(() => import(/* webpackChunkName: 'UserList' */'../pages/products/ProductList'));
const ProductViewPage = lazy(() => import(/* webpackChunkName: 'UserList' */'../pages/products/ProductView'));

const PostLoginRoutes = () => {
  console.log('inside post login routes');
  return (

    <Suspense fallback={<></>}>
      <Routes>
        <Route path="*" element={<Navigate to="/features" replace />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/features'} element={<Features />} />
        <Route path={'/user/list'} element={<UserListPage />} />
        <Route path={'/role/list'} element={<RoleListPage />} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route path={'/product/list'} element={<ProductListPage />} />
        <Route path={'/product/:productID'} element={<ProductViewPage />} />
        <Route path={'/user/:userID'} element={<ProfilePage />} />
      </Routes>
    </Suspense>
  )
}


export default PostLoginRoutes;
