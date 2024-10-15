import React from 'react';
import { Outlet } from 'react-router-dom';

import Nav from './nav'; 
import Header from './header';

const UserDashboardLayout = () => (
  <div className="user-dashboard-layout">
    <Header />
    <div className="user-dashboard-content">
      <Nav />
      <main className="user-main-content">
        <Outlet />
      </main>
    </div>
  </div>
);

export default UserDashboardLayout;
