import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signup(formData))
  };

  const authstate = useSelector((state) => state)
  const { user, isLoading, isError, isSuccess } = authstate.auth

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/")
    } else {
      navigate("")
    }
  }, [user, isLoading, isError, isSuccess, navigate])


  return (
    <div className="md:h-[82vh] h-[82vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-md space-y-8 p-10 bg-[#393939]">
        <div>
          <h2 className="text-center text-4xl font-bold text-white">
            Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-5">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Full Name
              </label>
              <input
                id="full-name"
                name="name"
                type="text"
                value={name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm"
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
                value={password}
                onChange={handleChange}
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
            <p className="text-center">Already have account? <span className="text-orange-600"><Link to="/login">Login</Link></span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;