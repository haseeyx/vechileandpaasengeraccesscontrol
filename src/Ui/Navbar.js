import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 shadow-md z-50 transition-all duration-500 ease-in-out">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 max-w-screen-xl">
        {/* VPACS Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <MdDashboard className="text-indigo-600 text-3xl transform transition-transform duration-300 hover:scale-110" />
          <span className="text-indigo-800 text-2xl font-bold hover:text-indigo-600 transition duration-300">
            VPACS
          </span>
        </NavLink>

        {/* Navbar Items */}
        <div className="flex space-x-6 text-lg font-semibold text-indigo-700">
          {/* Dashboard with Dropdown */}
          <div className="relative group">
            <NavLink
              to="/dashboard"
              className="relative text-indigo-700 hover:text-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
            >
              Dashboard
            </NavLink>
            <div
              className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-indigo-700 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 z-50"
            >
              <NavLink
                to="/dashboard"
                className="block px-4 py-2 hover:bg-indigo-100"
              >
                Vehicle Information
              </NavLink>
              <NavLink
                to="/driver"
                className="block px-4 py-2 hover:bg-indigo-100"
              >
                Driver Information
              </NavLink>
              <NavLink
                to="/passenger"
                className="block px-4 py-2 hover:bg-indigo-100"
              >
                Passenger Information
              </NavLink>
            </div>
          </div>
          <NavLink
            to="/view-record"
            className="relative text-indigo-700 hover:text-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
          >
            View Record
          </NavLink>
          <NavLink
            to="/admin-panel"
            className="relative text-indigo-700 hover:text-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
          >
            Admin Panel
          </NavLink>
          <NavLink
            to="/reports"
            className="relative text-indigo-700 hover:text-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
          >
            Reports
          </NavLink>
        </div>

        {/* Profile Icon */}
        <div className="w-10 h-10 bg-white text-indigo-600 rounded-full shadow-md flex items-center justify-center transition-transform duration-300 transform hover:scale-110 hover:bg-indigo-200 cursor-pointer">
          <AiOutlineUser className="text-2xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
