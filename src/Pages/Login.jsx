import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/Slices/AuthSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {user,loading,error}=useSelector(state=>state.auth)
  
  console.log(error)
  const [loginValue, setLoginValue] = useState({ Email: "", Password: "" });
  const [loginErrors, setLoginErrors] = useState({ Email: "", Password: "" });



  useEffect(() => {
    console.log('userr',user?.result?.role);
    
    if(user && user?.result) {
    navigate(user?.result?.role ==='admin' ? '/admin' : '/')
      
    }
  },[user,navigate])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginErrors({Email:"",Password:""});
    try {
     await dispatch(loginUser(loginValue)).unwrap()   
      setLoginValue({Email: "", Password: "" });
                  
    } catch (error) {
      console.log(error)

    }
   
  };

  const handleChange = (e) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-gray-700 text-sm md:text-lg">Email</label>
            <input
              type="Email"
              id="Email"
              name="Email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue text-sm md:text-lg"
              placeholder="you@gmail.com"
              value={loginValue.Email}
              onChange={handleChange}
              required
            />
            {loginErrors.Email && <p className="text-red-600 text-xs md:text-sm mt-1">{loginErrors.Email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-gray-700 text-sm md:text-lg">Password</label>
            <input
              type="Password"
              id="Password"
              name="Password"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue text-sm md:text-lg"
              placeholder="********"
              value={loginValue.Password}
              onChange={handleChange}
              required
            />
            {loginErrors.Password && <p className="text-red-600 text-xs md:text-sm mt-1">{loginErrors.Password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 text-sm md:text-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
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
