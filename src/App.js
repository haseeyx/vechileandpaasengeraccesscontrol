import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hs from './Ui/Hs';
import NumberPlateScanner from './Ui/Vehicle';  // Dashboard
import SignIn from './Ui/Signin';
import Layout from './Ui/Layout'; // Layout that includes Navbar
import AdminPanel from './Admin';
import Car from './Ui/Car';
import Passenger from './Ui/Passenger';
import Driver from './Ui/Driver';

const App = () => {
  return (
    <Routes>
      {/* Layout route: Navbar is always displayed for these routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={< Car />} />
        <Route path="/driver" element={< Driver />} />
        <Route path="/passenger" element={< Passenger/>} />


        <Route path="/view-record" element={<div>View Record</div>} /> {/* Add real component here */}
        <Route path="/admin-panel" element={<AdminPanel/>} />
        <Route path="/searching" element={<div>Searching</div>} />
        <Route path="/reports" element={<div>Reports</div>} />
      </Route>

      {/* Routes without Navbar */}
      <Route path="/" element={< Hs />} />  {/* Landing page with buttons */}
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  //  <PassengerForm/>
  );
};

export default App;
