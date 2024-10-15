import React from 'react';
import { Outlet } from 'react-router-dom';

import Nav from './nav'; 
import Header from './header';



const AdminDashboardLayout = () => (
  <div>
    <Header />
    <Nav />
    <Outlet />
  </div>
);

export default AdminDashboardLayout;
