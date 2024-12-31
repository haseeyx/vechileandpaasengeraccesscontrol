'use client';

import React, { useState, useEffect } from "react";
import Tesseract from 'tesseract.js';
import Imgy from "./Image";

const CNICScanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [personID, setPersonID] = useState('');
  const [personName, setPersonName] = useState('');
  const [nationality, setNationality] = useState('');
  const [passengers, setPassengers] = useState([{ id: 1 }]); // Initialize with one form
  const [showImgy , setShowImgy]= useState('');
  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
  });

  const [Purpose, setPurpose] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    personName : ' ',
        personID : '',
        personType : '',
        licenseType : '',
        Address : '',
        Purpose : '',
        entryFor :'',

  });
  

  // const handleEntryForChange = (event) => {
  //   setEntryFor(event.target.value);
  // };

  const extractCNICData = (text) => {
    const processedText = text.toLowerCase().replace(/\s+/g, ' ');

    let data = {
      type: 'cnic',
      cnicNumber: '',
      name: '',
    };

    const cnicRegex = /\b[0-9]{5}[-][0-9]{7}[-][0-9]\b/;
    const cnicMatch = text.match(cnicRegex);
    if (cnicMatch) {
      data.cnicNumber = cnicMatch[0];
    }

    const nameRegex = /(name|haseeb bhatti)[:\s]+([^\n]+)/i;
    const nameMatch = text.match(nameRegex);
    if (nameMatch && nameMatch[2]) {
      data.name = nameMatch[2].trim();
    }

    return data;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsLoading(true);
      setExtractedData(null);

      try {
        const result = await Tesseract.recognize(
          file,
          'eng',
          {
            logger: m => console.log(m),
            tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-/.: '
          }
        );

        const data = extractCNICData(result.data.text);
        setExtractedData(data);
        setPersonID(data.cnicNumber);
        setPersonName(data.name);
      } catch (error) {
        console.error('Error extracting text:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const validForm = () => {
    let formErrors = {};

    if (!formData.personName) formErrors.personName = "Person Name is required.";
    if (!formData.personID) formErrors.personID = "Person ID is required.";
    if (!formData.personType) formErrors.personType = "Person Type is required.";
    if (!formData.licenseType) formErrors.licenseType = "License Type is required.";
    if (!formData.Address) formErrors.Address = "Address is required.";
    if (!formData.Purpose) formErrors.Purpose = "Purpose is required.";
    if (!formData.entryFor) formErrors.entryFor = "Entry Type is required.";

    setErrors(formErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(formErrors).length === 0;
};

const handleSubmit = (e) => {
  // Prevent default form submission behavior
  e.preventDefault();

  if (validForm()) {
    if (window.confirm("Data Entered Successfully!")) {
      // Reload the page after the user clicks "OK" on the confirmation dialog
      window.location.reload();
    }
  }
};

const [showOneMore, setShowOneMore] = useState(false);
  


  useEffect(() => {
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString(); // Get the current date
    const time = currentDate.toLocaleTimeString(); // Get the current time
    setDateTime({ date, time });
  }, []);

  const addPassenger = () => {
    setPassengers([...passengers, { id: passengers.length + 1 }]);
  };


  return (
    <div>
            
            {passengers.map((passenger) => (
              <div key={passenger.id}>
              
            
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-300 to-indigo-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
            CNIC Scanner
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your CNIC image to extract information
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-indigo-100/50">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-indigo-200 rounded-2xl cursor-pointer bg-gray-50/50 hover:bg-gray-50/80 transition-all duration-300 group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                <div className="relative">
                  <svg className="w-16 h-16 text-indigo-500 mb-4 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                </div>
                <p className="mb-2 text-lg text-gray-600">
                  <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, or GIF (MAX. 10MB)</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Image Preview Section */}
        {selectedImage && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">Image Preview</h2>
            </div>
            <div className="relative group">
              <img
                src={selectedImage}
                alt="Scanned CNIC"
                className="w-full max-h-[400px] object-contain rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 transition-all duration-500">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="mt-6 text-lg font-medium text-gray-600">Processing your image...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        )}

        {/* Results Section */}
        {extractedData && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500">
            <div className="flex items-center mb-8">
              <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">Extracted Data</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DataField label="CNIC Number" value={personID || extractedData.cnicNumber} icon="🆔" />
              <DataField label="Name" value={personName || extractedData.name} icon="👤" />
            </div>
          </div>
        )}
        

        {/* Driver Information Form */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold font-bold text-indigo-800 mb-4">Passenger & Driver Information</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nationality</label>
              <select
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={nationality}
                onChange={(e) => setNationality( e.target.value)}
              >
                <option value="">Select Nationality</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Foreign">Foreign Country</option>
              </select>

            </div>

            {nationality === 'Pakistan' && (
  <div>
    {/* Person Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Person Name</label>
      <input
        type="text"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={`Enter  Name`}    
             value={formData.personName || extractedData?.name || ''}
        onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
      />
      {errors.personName && <p className="text-red-600 text-xs">{errors.personName}</p>}
    </div>

    {/* Person ID */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Person ID (CNIC)</label>
      <input
        type="number"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={`Enter ID`}    
        value={formData.personID || extractedData?.cnicNumber || ''} 
        onChange={(e) => setFormData({ ...formData, personID: e.target.value })}
      />
      {errors.personID && <p className="text-red-600 text-xs">{errors.personID}</p>}
    </div>

    {/* Person Type */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Person Type</label>
      <select
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={formData.personType || ''}
        onChange={(e) => setFormData({ ...formData, personType: e.target.value })}
      >
        <option value="">Select Person Type</option>
        <option value="Driver">Driver</option>
        <option value="Passenger">Passenger</option>
      </select>
      {errors.personType && <p className="text-red-600 text-xs">{errors.personType}</p>}
    </div>

    {/* License Type (Conditional) */}
    {formData.personType === 'Driver' && (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">License Type</label>
        <select
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.licenseType || ''}
          onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
        >
          <option value="">Select License Type</option>
          <option value="HTV">HTV</option>
          <option value="LTV">LTV</option>
        </select>
        {errors.licenseType && <p className="text-red-600 text-xs">{errors.licenseType}</p>}
      </div>
    )}

    {/* Address */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Address</label>
      <select
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={formData.Address || ''}
        onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
      >
        <option value="">Select Address</option>
        <option value="Punjab">Punjab</option>
        <option value="Sindh">Sindh</option>
        <option value="KPK">KPK</option>
        <option value="Balochistan">Balochistan</option>
        <option value="Gilgit">Gilgit</option>
      </select>
      {errors.Address && <p className="text-red-600 text-xs">{errors.Address}</p>}
    </div>

            

               





    <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Purpose</label>
  <select
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    value={formData.Purpose}
    onChange={(e) => {
      setFormData({ ...formData, Purpose: e.target.value });
    }}
  >
    <option value="">Select Purpose</option>
    <option value="Home">Home</option>
    <option value="Visitor">Visitor</option>
    <option value="Job">Job</option>
    <option value="Custom">Custom</option>
  </select>

  {/* Show the input field only when Custom is selected */}
  {formData.Purpose === "Custom" && (
    <input
      type="text"
      className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="Enter Custom Purpose"
      value={formData.CustomPurpose || ""}
      onChange={(e) =>
        setFormData({ ...formData, CustomPurpose: e.target.value })
      }
    />
  )}

  {errors.Purpose && <p className="text-red-600 text-xs">{errors.Purpose}</p>}
</div>



                
                {/* Add other fields like License Type, Address, etc. */}
              </div>
            )}
            {nationality === 'Foreign' && (
              <div>
                {/* Person Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Person Name</label>
      <input
        type="text"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter Person Name"
        value={formData.personName || ''}
        onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
      />
      {errors.personName && <p className="text-red-600 text-xs">{errors.personName}</p>}
    </div>

    {/* Person ID */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Person ID (CNIC)</label>
      <input
        type="text"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter Person ID"
        value={formData.personID || ''}
        onChange={(e) => setFormData({ ...formData, personID: e.target.value })}
      />
      {errors.personID && <p className="text-red-600 text-xs">{errors.personID}</p>}
    </div>
                 {/* Person Type */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Person Type</label>
      <select
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={formData.personType || ''}
        onChange={(e) => setFormData({ ...formData, personType: e.target.value })}
      >
        <option value="">Select Person Type</option>
        <option value="Driver">Driver</option>
        <option value="Passenger">Passenger</option>
      </select>
      {errors.personType && <p className="text-red-600 text-xs">{errors.personType}</p>}
    </div>

    {/* License Type (Conditional) */}
    {formData.personType === 'Driver' && (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">License Type</label>
        <select
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.licenseType || ''}
          onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
        >
          <option value="">Select License Type</option>
          <option value="HTV">HTV</option>
          <option value="LTV">LTV</option>
        </select>
        {errors.licenseType && <p className="text-red-600 text-xs">{errors.licenseType}</p>}
      </div>
    )}
                 <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Purpose</label>
  <select
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    value={formData.Purpose}
    onChange={(e) => {
      setFormData({ ...formData, Purpose: e.target.value });
    }}
  >
    <option value="">Select Purpose</option>
    <option value="Home">Home</option>
    <option value="Visitor">Visitor</option>
    <option value="Job">Job</option>
    <option value="Custom">Custom</option>
  </select>

  {/* Show the input field only when Custom is selected */}
  {formData.Purpose === "Custom" && (
    <input
      type="text"
      className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="Enter Custom Purpose"
      value={formData.CustomPurpose || ""}
      onChange={(e) =>
        setFormData({ ...formData, CustomPurpose: e.target.value })
      }
    />
  )}

  {errors.Purpose && <p className="text-red-600 text-xs">{errors.Purpose}</p>}
</div>

                {/* Add Purpose field */}
              </div>
            )}

<div>

   {/* Date and Time input fields */}
   <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date and Time
          </label>
          <div className="mt-1 flex space-x-4">
        
            <input
              type="text"
              id="date"
              value={dateTime.date}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Date: 'MM/DD/YYYY'"
            />
            <input
              type="text"
              id="time"
              value={dateTime.time}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Time: 'HH:MM:SS'"
            />
          </div>
        </div>

        {/* Name Entry For dropdown */}
        <div className="mb-4">
          <label htmlFor="entryFor" className="block text-sm font-medium text-gray-700">
            Name Entry For
          </label>
          <select
            id="entryFor"
            value={formData.entryFor}
            onChange={(e) => setFormData({ ...formData, entryFor: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Entry Type</option>
            <option value="In">In</option>
            <option value="Out">Out</option>
          </select>
          {errors.entryFor && <p className="text-red-600 text-xs">{errors.entryFor}</p>}

        </div>
<div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-4 mb-4">
          <label htmlFor="showImgy" className="text-gray-600 font-medium"> Upload Image ..</label>
          <select
            id="showImgy"
            className="bg-indigo-50 border-indigo-300 border rounded-md p-2 mt-2"
            value={showImgy ? "Yes" : "No"}
            onChange={(e) => setShowImgy(e.target.value === "Yes")}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {showImgy && <Imgy />}
        </div>
        <br></br>
        
<hr></hr>

      <br></br>
           
          </form>
        </div>

          
      </div>
    </main>
    </div>
    ))}


    
    <div>
      <button
        type="button"
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700"
        onClick={addPassenger}
      >
        AddOnMore
      </button>

     {/* Conditionally render the OneMore component */}
    </div>
    <hr></hr> <br></br>

                 <div>

                 <button
              type="button"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700"
            onClick={handleSubmit}
            >
              Submit
            </button>

                 </div>






    </div>
  );
};
const DataField = ({ label, value, icon }) => (
  <></>
);

export default CNICScanner;


