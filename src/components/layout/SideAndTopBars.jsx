import React from 'react';
import Sidebar from '../common/sidebar/Sidebar';
import TopBar from '../common/topbar/TopBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app">
      <Sidebar />
      <main
        className="content h-screen bg-[#f8fafc]"
        style={{ overflow: 'auto' }}
      >
        <TopBar />
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
