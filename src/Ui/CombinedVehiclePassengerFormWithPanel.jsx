// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Upload, X, ChevronLeft, ChevronRight, Shield } from 'lucide-react'

// const typewriterTexts = [
//   "Welcome to VPACS",
//   "Secure Vehicle Registration",
//   "Efficient Passenger Management",
//   "Advanced Access Control",
//   "Streamlined Security Solutions"
// ]

// const images = [
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dzAY9vxSYgd7Zz6Aji9j2-LaG3-BF5iw5w&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dzAY9vxSYgd7Zz6Aji9j2-LaG3-BF5iw5w&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dzAY9vxSYgd7Zz6Aji9j2-LaG3-BF5iw5w&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dzAY9vxSYgd7Zz6Aji9j2-LaG3-BF5iw5w&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dzAY9vxSYgd7Zz6Aji9j2-LaG3-BF5iw5w&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dzAY9vxSYgd7Zz6Aji9j2-LaG3-BF5iw5w&s',
//   // '/placeholder.svg?height=400&width=600',
//   // '/placeholder.svg?height=400&width=600',
//   // '/placeholder.svg?height=400&width=600',
// ]

// export default function CombinedVehiclePassengerFormWithPanel() {
//   const [step, setStep] = useState(1)
//   const [vehicleData, setVehicleData] = useState({})
//   const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()

//   const vehicleType = watch('vehicleType')
//   const personType = watch('personType')

//   const [vehiclePhotoPreview, setVehiclePhotoPreview] = useState(null)
//   const [licensePlatePreview, setLicensePlatePreview] = useState(null)
//   const [photoIdPreview, setPhotoIdPreview] = useState(null)
//   const [passengers, setPassengers] = useState([{ id: Date.now() }]);

//   const [typewriterIndex, setTypewriterIndex] = useState(0)
//   const [typewriterText, setTypewriterText] = useState('')
//   const [imageIndex, setImageIndex] = useState(0)

//   useEffect(() => {
//     const typewriterInterval = setInterval(() => {
//       const currentText = typewriterTexts[typewriterIndex]
//       if (typewriterText.length < currentText.length) {
//         setTypewriterText(currentText.slice(0, typewriterText.length + 1))
//       } else {
//         setTimeout(() => {
//           setTypewriterText('')
//           setTypewriterIndex((prevIndex) => (prevIndex + 1) % typewriterTexts.length)
//         }, 1000)
//       }
//     }, 100)

//     return () => clearInterval(typewriterInterval)
//   }, [typewriterIndex, typewriterText])
//   const renderlist = () => {
  
//     const addPassenger = () => {
//       setPassengers([...passengers, { id: Date.now() }]);
//     };
  
//     return (
//       <form onSubmit={handleSubmit(onPersonSubmit)} className="space-y-6 overflow-scroll">
//         <h2 className="text-2xl font-bold text-gray-900 mb-5">Person Details</h2>
  
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Person Type</label>
//           <div className="mt-2 space-x-4">
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 {...register('personType', { required: 'Person type is required' })}
//                 value="driver"
//                 className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
//               />
//               <span className="ml-2 text-sm text-gray-700">Driver</span>
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 {...register('personType', { required: 'Person type is required' })}
//                 value="passenger"
//                 className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
//               />
//               <span className="ml-2 text-sm text-gray-700">Passenger</span>
//             </label>
//           </div>
//           {errors.personType && (
//             <p className="mt-2 text-sm text-red-600">{errors.personType.message}</p>
//           )}
//         </div>
  
//         <div>
//           <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="fullName"
//             {...register('fullName', { required: 'Full name is required' })}
//             className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//             placeholder="Enter your full name"
//           />
//           {errors.fullName && (
//             <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
//           )}
//         </div>
  
//         {personType === 'driver' && (
//           <div>
//             <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
//               Driver's License Number
//             </label>
//             <input
//               type="text"
//               id="licenseNumber"
//               {...register('licenseNumber', { required: 'License number is required' })}
//               className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//               placeholder="Enter your driver's license number"
//             />
//             {errors.licenseNumber && (
//               <p className="mt-2 text-sm text-red-600">{errors.licenseNumber.message}</p>
//             )}
//           </div>
//         )}
  
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             {...register('email', {
//               required: 'Email is required',
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: 'Invalid email address',
//               },
//             })}
//             className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//             placeholder="Enter your email address"
//           />
//           {errors.email && (
//             <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
//           )}
//         </div>
  
//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             {...register('phone', { required: 'Phone number is required' })}
//             className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//             placeholder="Enter your phone number"
//           />
//           {errors.phone && (
//             <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
//           )}
//         </div>
  
//         <div>
//           <h3 className="text-lg font-medium text-gray-900 mb-3">Passengers</h3>
//           {passengers.map((passenger, index) => (
//             <div key={passenger.id} className="space-y-4 border-b pb-4 mb-4">
//               <div>
//                 <label
//                   htmlFor={`passengerName-${index}`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Passenger {index + 1} Name
//                 </label>
//                 <input
//                   type="text"
//                   id={`passengerName-${index}`}
//                   {...register(`passengerName_${index}`, {
//                     required: 'Passenger name is required',
//                   })}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   placeholder={`Enter passenger ${index + 1} name`}
//                 />
//                 <label
//                   htmlFor={`CNIC-${index}`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   CNIc {index + 1} 
//                 </label>
//                 <input
//                   type="text"
//                   id={`CNIC-${index}`}
                  
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   placeholder={`Enter CNIC ${index + 1}`}
//                 />
//                 {errors[`passengerName_${index}`] && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {errors[`passengerName_${index}`].message}
//                   </p>
//                 )}
//               </div>
  
//               <div>
//                 <label
//                   htmlFor={`passengerPhone-${index}`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Passenger {index + 1} Phone
//                 </label>
//                 <input
//                   type="tel"
//                   id={`passengerPhone-${index}`}
//                   {...register(`passengerPhone_${index}`, {
//                     required: 'Passenger phone number is required',
//                   })}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   placeholder={`Enter passenger ${index + 1} phone`}
//                 />
//                 {errors[`passengerPhone_${index}`] && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {errors[`passengerPhone_${index}`].message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
  
//           <button
//             type="button"
//             onClick={addPassenger}
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Add Another Passenger
//           </button>
//         </div>
  
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             onClick={() => setStep(1)}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Back
//           </button>
//           <button
//             type="submit"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     );
//   };
  
  
//   useEffect(() => {
//     const imageInterval = setInterval(() => {
//       setImageIndex((prevIndex) => (prevIndex + 1) % images.length)
//     }, 5000)

//     return () => clearInterval(imageInterval)
//   }, [])

//   const handleImagePreview = (e, setPreview) => {
//     const file = e.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreview(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const onVehicleSubmit = (data) => {
//     setVehicleData(data)
//     setStep(2)
//   }

//   const onPersonSubmit = (data) => {
//     const finalData = {
//       ...vehicleData,
//       ...data
//     }
//     console.log('Final form data:', finalData)
//     // Here you would typically submit the data to your backend
//     reset()
//     setStep(1)
//     setVehiclePhotoPreview(null)
//     setLicensePlatePreview(null)
//     setPhotoIdPreview(null)
//   }

//   return (
//     <div className=" bg-gradient-to-br from-indigo-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8 overflow-none">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl ">
//         <div className="flex flex-col md:flex-row ">
//           {/* Left Panel */}
//           <div className="md:w-1/2 bg-indigo-600  h-screen	 text-white p-8 flex flex-col justify-between min-h-[600px] overflow-hidden">
//             <div>
//               <div className="flex items-center space-x-2 mb-6">
//                 <Shield className="h-8 w-8" />
//                 <h1 className="text-3xl font-bold">VPACS</h1>
//               </div>
//               <h2 className="text-3xl font-bold mb-4">Vehicle and Passenger Registration</h2>
//               <motion.div
//                 key={typewriterIndex}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="h-16 flex items-center"
//               >
//                 <p className="text-xl">{typewriterText}</p>
//               </motion.div>
//             </div>
//             <div className="mt-8">
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={imageIndex}
//                   src={images[imageIndex]}
//                   alt={`VPACS feature ${imageIndex + 1}`}
//                   className="w-full h-64 object-cover rounded-lg shadow-lg"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Right Panel - Forms */}
         
//         </div>
//       </div>
//     </div>
//   )
// }

