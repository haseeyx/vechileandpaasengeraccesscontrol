'use client';

import { useState , useEffect } from "react";
import Tesseract from 'tesseract.js';
import Imgy from "./Image";
export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [scanMode, setScanMode] = useState('cnic'); // 'cnic' or 'numberplate'
    const [nationality, setNationality] = useState('');
    const [errors, setErrors] = useState({});
      const [showImgy , setShowImgy]= useState('');
      const [dateTime, setDateTime] = useState({ date: "", time: "" });

    
    
    useEffect(() => {
        const updateDateTime = () => {
          const now = new Date();
          const formattedDate = now.toLocaleDateString("en-US"); // Format: MM/DD/YYYY
          const formattedTime = now.toLocaleTimeString("en-US"); // Format: HH:MM:SS AM/PM
          setDateTime({ date: formattedDate, time: formattedTime });
        };
    
        // Set initial date and time
        updateDateTime();
    
        // Update time every second (optional)
        const timer = setInterval(updateDateTime, 1000);
    
        return () => clearInterval(timer); // Cleanup timer on unmount
      }, []);
    
  const extractCNICData = (text) => {
    const processedText = text.toLowerCase().replace(/\s+/g, ' ');
  
    let data = {
      type: 'cnic',
      cnicNumber: '',
     
    };
  
    // Extract CNIC Number
    const cnicRegex = /\b[0-9]{5}[-][0-9]{7}[-][0-9]\b/;
    const cnicMatch = text.match(cnicRegex);
    if (cnicMatch) {
      data.cnicNumber = cnicMatch[0];
    }
  
    // Extract Name
    const nameRegex = /(name|haseeb bhatti)[:\s]+([^\n]+)/i;
    const nameMatch = text.match(nameRegex);
    if (nameMatch && nameMatch[2]) {
      data.name = nameMatch[2].trim();
    }
  
    // Extract Father's Name
   
  
    // Extract Dates
   
  
    return data;
  };
const [formData, setFormData] = useState({
    personName : ' ',
        personID : '',
        personType : '',
        licenseType : '',
        Address : '',
        Purpose : '',
        entryFor :'',

  });
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
        
        const data = scanMode === 'cnic' 
          ? extractCNICData(result.data.text)
          : null; // No need for number plate processing here
        setExtractedData(data);
      } catch (error) {
        console.error('Error extracting text:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
  
    
      if (window.confirm("Data Entered Successfully!")) {
        // Reload the page after the user clicks "OK" on the confirmation dialog
        window.location.reload();
      
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 flex items-center justify-center gap-2">
            Driver Information
          </h1>
          <p className="text-lg md:text-xl text-indigo-600 max-w-2xl mx-auto">
            Scan CNIC & Image Processing
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-indigo-100/50">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300">
            <div className="flex flex-col items-center py-6">
              <svg
                className="w-10 h-10 text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PNG, JPG, or GIF (MAX. 10MB)</p>
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

      

        {selectedImage && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500">
            <h2 className="text-xl font-bold text-indigo-800 mb-4">Image Preview</h2>
            <img
              src={selectedImage}
              alt="Uploaded preview"
              className="w-48 h-48 object-contain rounded-lg"
            />
          </div>
        )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 transition-all duration-500">
              <p className="mt-6 text-lg font-medium text-gray-600">Processing your image...</p>
            </div>
          )}

          {/* Results Section */}
          {extractedData && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500">
            <h2 className="text-2xl font-bold text-gray-800">Extracted Data</h2>
            <p>CNIC Number: {extractedData.cnicNumber || 'Not found'}</p>
            <p>Name: {extractedData.name || 'Not found'}</p>
          </div>
        )}

 <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold font-bold text-indigo-800 mb-4"> Driver Information</h2>
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
              placeholder="Enter Name"
              value={formData.personName || extractedData?.name || ''}
              onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
            />
          </div>
    {/* Person ID */}
    <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Person ID (CNIC)</label>
            <input
              type="text"  
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter ID"
              value={formData.personID || extractedData?.cnicNumber || ''}
              onChange={(e) => setFormData({ ...formData, personID: e.target.value })}
            />
          </div>

    {/* Person Type */}
   

    {/* License Type (Conditional) */}

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
      </div>
   

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
            <label className="block text-sm font-medium text-gray-700">Contact No</label>
            <input
              type="number"  
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Contact no"
              value={formData.contactno }
              onChange={(e) => setFormData({ ...formData, contactno: e.target.value })}
            />
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
 

    {/* License Type (Conditional) */}
   
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

        <div className="form-container">
        <button
          type="button"
          className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSubmit}
        >
        Submit
        </button>
      </div>














        </div>
      </div>
    </main>
  );
}