import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = { email: "", password: "" };
    try {
      const response = await axios.get("http://localhost:3000/users");
      const user = response.data.find((user) => user.email === loginValue.email);
      if (user) {
        if (user.is_blocked){
          toast.error('You are blocked');
        } 
        else if (user.password === loginValue.password) {
          toast.success("Successfully logged in");
            localStorage.setItem("id", user.id);
            localStorage.setItem("name", user.username);
           
            setLoginValue({ email: "", password: "" });
            if (user.admin) {
              navigate('/admin');
              localStorage.setItem("admin", user.admin);
            } else {
              navigate('/');
            }
          } 
        else {
          validation.password = "Incorrect password";
          toast.warning("incorrect password")
        }
      } else {
        validation.email = "Email not found";
        validation.password = "Incorrect Password";
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
    setLoginErrors(validation);
  }

  const handleChange = (e) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm md:text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue text-sm md:text-lg"
              placeholder="you@gmail.com"
              value={loginValue.email}
              onChange={handleChange}
              required
            />
            {loginErrors.email && <p className="text-red-600 text-xs md:text-sm mt-1">{loginErrors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm md:text-lg">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue text-sm md:text-lg"
              placeholder="********"
              value={loginValue.password}
              onChange={handleChange}
              required
            />
            {loginErrors.password && <p className="text-red-600 text-xs md:text-sm mt-1">{loginErrors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 text-sm md:text-lg"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-xs md:text-sm text-gray-600">
          Don't have an Account? <Link to={'/signup'} className="text-gray-700 hover:underline">SignUp</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
