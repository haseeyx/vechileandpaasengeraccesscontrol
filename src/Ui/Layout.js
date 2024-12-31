import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Render Navbar */}
      <Navbar />
      {/* The Outlet renders the nested routes */}
      <div className="mt-16"> {/* Adds margin to prevent navbar overlap */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
