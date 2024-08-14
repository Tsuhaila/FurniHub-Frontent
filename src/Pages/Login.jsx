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
        if (user.password === loginValue.password) {
          localStorage.setItem("id", user.id);
          localStorage.setItem("name", user.username);
          toast.success("successfully completed")
          setLoginValue({email:"",password:""})
          navigate('/');
      


        } else {
          validation.password = "Incorrect password";
        }
      } else {
        validation.email = "Email not found";
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
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue text-lg"
              placeholder="you@example.com"
              value={loginValue.email}
              onChange={handleChange}
              required
            />
            {loginErrors.email && <p className="text-red-600 text-sm mt-1">{loginErrors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-lg">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue text-lg"
              placeholder="********"
              value={loginValue.password}
              onChange={handleChange}
              required
            />
            {loginErrors.password && <p className="text-red-600 text-sm mt-1">{loginErrors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-950 text-white py-3 rounded-md hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-900 text-lg"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an Account? <Link to={'/signup'} className="text-blue-600 hover:underline">SignUp</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
