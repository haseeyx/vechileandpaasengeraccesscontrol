import React from 'react';

export default function Rightpanel() {
  return (
    <div>
         <div className="md:w-1/2 p-8 	 h-screen overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 ? (
                  <form onSubmit={handleSubmit(onVehicleSubmit)} className="space-y-6 overflow-hidden">
                    <h2 className="text-2xl font-bold text-gray-900 mb-5">Vehicle Details</h2>
                    <div>
                      <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                        Vehicle Type
                      </label>
                      <select
                        id="vehicleType"
                        {...register('vehicleType', { required: 'Vehicle type is required' })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Select a type</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="motorcycle">Motorcycle</option>
                      </select>
                      {errors.vehicleType && (
                        <p className="mt-2 text-sm text-red-600">{errors.vehicleType.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                        License Plate Number
                      </label>
                      <input
                        type="text"
                        id="licensePlate"
                        {...register('licensePlate', { required: 'License plate is required' })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter license plate number"
                      />
                      {errors.licensePlate && (
                        <p className="mt-2 text-sm text-red-600">{errors.licensePlate.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
                        Manufacturer
                      </label>
                      <input
                        type="text"
                        id="manufacturer"
                        {...register('manufacturer', { required: 'Manufacturer is required' })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter vehicle manufacturer"
                      />
                      {errors.manufacturer && (
                        <p className="mt-2 text-sm text-red-600">{errors.manufacturer.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                        Model
                      </label>
                      <input
                        type="text"
                        id="model"
                        {...register('model', { required: 'Model is required' })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter vehicle model"
                      />
                      {errors.model && (
                        <p className="mt-2 text-sm text-red-600">{errors.model.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="number"
                        id="year"
                        {...register('year', {
                          required: 'Year is required',
                          min: { value: 1900, message: 'Year must be 1900 or later' },
                          max: { value: new Date().getFullYear() + 1, message: 'Year cannot be more than one year in the future' }
                        })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter vehicle year"
                      />
                      {errors.year && (
                        <p className="mt-2 text-sm text-red-600">{errors.year.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vehicle Photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {vehiclePhotoPreview ? (
                            <div className="relative inline-block">
                              <img
                                src={vehiclePhotoPreview}
                                alt="Vehicle preview"
                                className="max-h-48 rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => setVehiclePhotoPreview(null)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          )}
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="vehicle-photo"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="vehicle-photo"
                                type="file"
                                className="sr-only"
                                {...register('vehiclePhoto', { required: 'Vehicle photo is required' })}
                                onChange={(e) => handleImagePreview(e, setVehiclePhotoPreview)}
                                accept="image/*"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                      {errors.vehiclePhoto && (
                        <p className="mt-2 text-sm text-red-600">{errors.vehiclePhoto.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Next
                        <ChevronRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                ) : (
                 renderlist()
                )}
              </motion.div>
            </AnimatePresence>
          </div>
    </div>
  )
}