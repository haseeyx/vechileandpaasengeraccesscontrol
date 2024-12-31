import React from 'react';
import Navbar from './Ui/Navbar';
import { Outlet } from 'react-router-dom'; // Used to render the child routes

const Layout = () => {
  return (
    <div>
      {/* Render Navbar only if it's the right page */}
      <Navbar />
      <div className="mt-16"> {/* Add margin-top to prevent navbar overlap */}
        <Outlet /> {/* The child routes will be rendered here */}
      </div>
    </div>
  );
};

export default Layout;
