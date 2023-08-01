import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="md:h-[82vh] h-[82vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-md space-y-8 p-10 bg-[#393939]">
        <div>
          <h2 className="text-center text-4xl font-bold text-white">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-5">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
            >
              Submit
            </button>
          </div>

          <div>
            <p className="text-center">Dont have account? <span className="text-orange-600"><Link to="/register">Register</Link></span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;