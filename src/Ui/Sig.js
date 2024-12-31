import React, { useState } from 'react';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [cnic, setCnic] = useState('');

  const toggleForm = () => setIsSignUp(!isSignUp);

  // Handle image upload and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-300 to-indigo-400">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 overflow-visible">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        <form className="space-y-6">
          {/* CNIC or Email Input (Sign Up and Sign In) */}
          {isSignUp ? (
            // Sign Up Form - Email, CNIC, and Name
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-indigo-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 p-3 w-full border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-700 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-900">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 p-3 w-full border border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </>
          ) : (
            // Sign In Form - CNIC or Email
            <div>
              <label htmlFor="emailOrCnic" className="block text-sm font-medium text-indigo-900">
                {cnic ? "CNIC" : "Email Address"}
              </label>
              <input
                type={cnic ? "text" : "email"}
                id="emailOrCnic"
                name="emailOrCnic"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                required
                className="mt-1 p-3 w-full border border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder={cnic ? "Enter your CNIC" : "Enter your email"}
              />
            </div>
          )}

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-indigo-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 p-3 w-full border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-700 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password (only for Sign Up) */}
          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-900">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="mt-1 p-3 w-full border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-800 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Toggle Between Sign In / Sign Up */}
        <div className="mt-4 text-center">
          <p className="text-indigo-900">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={toggleForm}
              className="text-indigo-700 hover:text-indigo-700 font-semibold ml-2"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
