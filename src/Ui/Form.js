import React, { useState } from 'react';

const PassengerForm = () => {
  const [passengers, setPassengers] = useState([{ id: 1, personName: '', age: '', passportNumber: '' }]);
  const [errors, setErrors] = useState({});

  const addPassenger = () => {
    setPassengers([...passengers, { id: passengers.length + 1, personName: '', age: '', passportNumber: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  return (
    <div>
      <h1>Passenger Input Form</h1>
      {passengers.map((passenger, index) => (
        <div key={passenger.id} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Person Name</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={`Enter ${passenger.id} Name`}
            value={passenger.personName} // Bind to the specific passenger's state
            onChange={(e) => handleChange(index, 'personName', e.target.value)} // Update specific passenger
          />
          {errors.personName && <p className="text-red-600 text-xs">{errors.personName}</p>}
        </div>
      ))}
      <button onClick={addPassenger}>Add One More</button>
    </div>
  );
};

export default PassengerForm;