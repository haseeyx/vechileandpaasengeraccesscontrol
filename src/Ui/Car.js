'use client';

import { useState } from "react";
import Tesseract from 'tesseract.js';
import { FaCar } from 'react-icons/fa';


export default function Car() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [formData, setFormData] = useState({
    plateNumber: '',
    region: '',
    category: '',
    vehicleType: '',
    vehicleModel: '',
  });
  const [errors, setErrors] = useState({});
  const [showNextComponent, setShowNextComponent] = useState(false);
  const extractNumberPlateData = (text) => {
    const processedText = text.toUpperCase().replace(/\s+/g, ' ').trim();

    let data = {
      type: 'numberplate',
      plateNumber: '',
      region: '',
      category: ''
    };

    const plateRegex = /([A-Z]{2,3}[-\s]?\d{3,4})|([A-Z]{2}[-\s]?\d{3,4})/g;
    const matches = processedText.match(plateRegex);

    if (matches) {
      data.plateNumber = matches[0].replace(/\s+/g, '-');

      const regionMatch = data.plateNumber.match(/^[A-Z]{2,3}/);
      if (regionMatch) {
        data.region = getRegionName(regionMatch[0]);
      }

      data.category = determineVehicleCategory(data.plateNumber);
    }

    return data;
  };

  const getRegionName = (code) => {
    const regions = {
      'ISL': 'Islamabad',
      'LHR': 'Lahore',
      'KHI': 'Karachi',
      'PES': 'Peshawar',
      'RWP': 'Rawalpindi',
    };
    return regions[code] || code;
  };

  const determineVehicleCategory = (plateNumber) => {
    if (plateNumber.match(/^[A-Z]{2}/)) {
      return 'Government Vehicle';
    } else if (plateNumber.match(/^[A-Z]{3}/)) {
      return 'Private Vehicle';
    }
    return 'Unknown';
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
        const data = extractNumberPlateData(result.data.text);
        setExtractedData(data);
        setFormData({
          ...formData,
          plateNumber: data.plateNumber,
          region: data.region,
          category: data.category,
        });
      } catch (error) {
        console.error('Error extracting text:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validForm = () => {
    let formErrors = {};
    if (!formData.plateNumber) formErrors.plateNumber = "Plate Number is required.";
    if (!formData.vehicleType) formErrors.vehicleType = "Vehicle Type is required.";
    if (!formData.vehicleModel) formErrors.vehicleModel = "Vehicle Model is required.";
    if (!formData.category) formErrors.category = "Category is required.";
    setErrors(formErrors);
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

  return (
<div className="min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-50 flex items-center justify-center p-6">
<div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 flex items-center justify-center gap-2">
            <FaCar className="text-indigo-600" />
           Vehicle Information & Number Plate Scanner
          </h1>
          <p className="text-lg md:text-xl text-indigo-600 max-w-2xl mx-auto">
            Upload an image to extract vehicle number plate details.
          </p>
        </div>

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

        {/* Image Preview */}
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
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Processing the image...</p>
          </div>
        )}

        {/* Vehicle Form */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mt-8">
          <h1 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
            <FaCar className="text-indigo-1200" /> Vehicle Information
          </h1>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                <select
                  id="vehicleType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                >
                                                    <option value="">Select Type </option>

                  <option>Car</option>
                  <option>Bus</option>
                  <option>Motorcycle</option>
                  <option>Truck</option>
                  <option>Jeep</option>
                </select>
                {errors.vehicleType && <p className="text-red-600 text-xs">{errors.vehicleType}</p>}
              </div>
              <div>
                <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700">Plate Number</label>
                <input
                  type="text"
                  id="plateNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  value={formData.plateNumber || extractedData?.plateNumber || ''}
                  onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                />
                {errors.plateNumber && <p className="text-red-600 text-xs">{errors.plateNumber}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  id="company"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  placeholder="Toyota, Honda, etc."
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                type="text"
                  id="category"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  value={formData.category || extractedData?.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                > 
                                <option value="">Select Category </option>

                  <option>Government</option>
                  <option>Private</option>
                </select>
                {errors.category && <p className="text-red-600 text-xs">{errors.category}</p>}
              </div>
              <div>
                <label htmlFor="vehicleColor" className="block text-sm font-medium text-gray-700">Vehicle Color</label>
                <input
                  type="text"
                  id="vehicleColor"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                />
              </div>
              <div>
                <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                <input
                  type="text"
                  id="vehicleModel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  placeholder="Year"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                />
                {errors.vehicleModel && <p className="text-red-600 text-xs">{errors.vehicleModel}</p>}
              </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
                <input
                  type="text"
                  id="region"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  value={formData.region || extractedData?.region || ''}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                />
              </div>
            </div>

            <div>
      {/* Your form fields */}
      <div className="form-container">
        <button
          type="button"
          className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSubmit}
        >
        Submit
        </button>
      </div>

      {/* Conditionally render CNICScanner component */}
    </div>
          </form>
        </div>
      </div>
    </div>
  );
}
