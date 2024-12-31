import React, { useState } from 'react';
import { FaUsers, FaChartBar, FaCog, FaTools, FaUserShield, FaRegClock, FaDatabase } from 'react-icons/fa';

const AdminPanel = () => {
  const [requests] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', status: 'Pending' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', status: 'Pending' },
    { id: 3, name: 'Alex Johnson', email: 'alexjohnson@example.com', status: 'Pending' },
  ]);

  const handleAccept = (id) => {
    console.log(`Accepted Request with ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejected Request with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Signup Requests */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-indigo-900 mb-6">User Signup Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-t border-b border-gray-200 hover:bg-indigo-50">
                    <td className="py-3 px-6 text-gray-900">{request.name}</td>
                    <td className="py-3 px-6 text-gray-900">{request.email}</td>
                    <td className="py-3 px-6 text-gray-900">{request.status}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Section 1: User Stats, System Performance, and Security */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-indigo-900 mb-6">System Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Statistics */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-center">
              <FaUsers className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">User Statistics</h3>
                <p className="text-lg text-indigo-700">2,345 active users</p>
              </div>
            </div>

            {/* System Performance */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-center">
              <FaChartBar className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">System Performance</h3>
                <p className="text-lg text-indigo-700">95% system uptime</p>
              </div>
            </div>

            {/* System Security */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-center">
              <FaUserShield className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">System Security</h3>
                <p className="text-lg text-indigo-700">Enhanced security features</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Feature Section 2: Admin Settings, Tools Management, and Data Storage */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-indigo-900 mb-6">Admin Controls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Admin Settings */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-center">
              <FaCog className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">Admin Settings</h3>
                <p className="text-lg text-indigo-700">Manage system settings</p>
              </div>
            </div>

            {/* Tools Management */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-center">
              <FaTools className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">Tools Management</h3>
                <p className="text-lg text-indigo-700">Manage all system tools</p>
              </div>
            </div>

            {/* Data Storage */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-center">
              <FaDatabase className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">Data Storage</h3>
                <p className="text-lg text-indigo-700">Reliable data storage management</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Feature Section 3: Time Monitoring and Log Insights */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-indigo-900 mb-6">Additional Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Time Monitoring */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-center">
              <FaRegClock className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">Time Monitoring</h3>
                <p className="text-lg text-indigo-700">Track system uptime and performance</p>
              </div>
            </div>

            {/* Log Insights */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-center">
              <FaDatabase className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">Log Insights</h3>
                <p className="text-lg text-indigo-700">Review system logs and activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
