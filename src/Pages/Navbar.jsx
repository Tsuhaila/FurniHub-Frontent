import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";

export const Navbar = () => {
  const [isLoggin, setIsLoggin] = useState(false);
  const user=localStorage.getItem("name")

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLoggin(true);
    }
  }, [isLoggin]);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");

    alert("are you sure")
    window.location.reload();
  };

  return (
    <nav className='p-4 shadow-md flex items-center justify-between sticky top-0 z-50 bg-white'>
      <div>
      <p className="text-md">Furnihub</p>
      </div>
      <div className='flex gap-5'>
      <NavLink to='/' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Home</NavLink>
        <NavLink to='/about' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>About</NavLink>
        <NavLink to='/shoppage' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Shop</NavLink>
        <NavLink to='/contact' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Contact</NavLink>
      </div>
      <div className='flex gap-3 items-center'>
      {isLoggin?(
          <div className='flex items-center space-x-2'>
          <CgProfile className="text-black" />
          <span className='text-black font-semibold'>{user}</span>
          
          <button onClick={handleLogout} className=' text-black  font-semibold'>Logout
         </button>
         </div>

        ) 
         
          : <NavLink to='/login' className=' text-black  font-semibold'>
              Login
            </NavLink>
        }
       
         <NavLink to='/cart' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>
          <FaShoppingCart />
        </NavLink>
      </div>

    </nav>




  );
};
