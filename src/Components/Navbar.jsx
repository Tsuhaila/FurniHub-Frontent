import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../Context/CartProvider';
import Swal from 'sweetalert2';


export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggin, setIsLoggin] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = localStorage.getItem("name");
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItem } = useContext(cartContext);
  const dropdownRef = useRef(null);
  const sidebarREf = useRef(null)

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLoggin(true);
    }
  }, [isLoggin]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate('/');
        window.location.reload();
      }
    });
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  async function handleSearch(e) {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
      navigate('/');
      return;
    }
    e.preventDefault();

    try {
      const result = await axios.get("http://localhost:3000/products");
      const combinedResult = result.data;
      const filteredResult = combinedResult.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      navigate('/search', { state: { results: filteredResult } });
    } catch (error) {
      console.log(error);
    }
  }

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (sidebarREf.current && !sidebarREf.current.contains(event.target)) {
      setMenuOpen(false)

    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);

    }
  };

  useEffect(() => {
    // Add event listener to close dropdown when clicking outside
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const admin = localStorage.getItem("admin");


  return (
    <nav className='p-4 shadow-md flex items-center justify-between sticky top-0 z-50 bg-white'>
      <div className='flex items-center'>
        <FaBars className="h-6 w-6 cursor-pointer mr-4 md:hidden" onClick={toggleMenu} />
        <p className="text-md">Furnihub</p>
      </div>
      <div className='w-full max-w-sm hidden md:block'>
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
      </div>
     
    
      <div className={`md:flex gap-5 items-center ${menuOpen ? 'hidden' : 'hidden'} md:block`}>
        <NavLink to='/' className={({ isActive }) => `text-black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Home</NavLink>
        <NavLink to='/about' className={({ isActive }) => `text-black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>About</NavLink>
        <NavLink to='/products' className={({ isActive }) => `text-black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Shop</NavLink>
        <NavLink to='/contact' className={({ isActive }) => `text-black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Contact</NavLink>
        <NavLink to='/orders' className={({ isActive }) => `text-black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Orders</NavLink>
       
      </div>

      <div className='flex gap-3 items-center'>
      <div className='md:hidden flex items-center'>
        {searchVisible && (
        <div className='w-auto md:hidden'>
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            className="w-auto px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
      )}
        <FaSearch className="h-4 w-4 ml-2 cursor-pointer" onClick={toggleSearch} />
      </div>
      
        <NavLink to='/cart' className={({ isActive }) => `relative text-black h-5 w-5 font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>
          <FaShoppingCart />
          <p className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]'>
            {cartItem?.length}
          </p>
        </NavLink>

        {user && (
          <button className='text-black hidden font-semibold md:block'>{user}</button>
        )}
        <div className='relative'>
          <CgProfile className="h-5 w-5 cursor-pointer" onClick={handleProfileClick} />
          {dropdownVisible && (
            <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg' ref={dropdownRef}>
              {!user ? (
                <NavLink to={'/login'} className='block px-4 py-2 text-black hover:bg-gray-100'>Login</NavLink>
              ) : (
                <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-black hover:bg-gray-100'>Logout</button>
              
              )}
              {admin && (
                <NavLink to={'/admin'} className='block px-4 py-2 text-black hover:bg-gray-100'>Go to admin</NavLink>
          
        )}
            </div>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className='md:hidden fixed top-0 left-0 w-1/3 h-full bg-black bg-opacity-50' ref={sidebarREf}>
          <div className='absolute top-0 left-0 bg-white w-full h-full flex flex-col p-4'>
            <FaTimes className="h-6 w-6 cursor-pointer self-end mb-4" onClick={toggleMenu} />
            <NavLink to='/' className='text-black font-semibold hover:text-gray-400 transition-colors py-2'>Home</NavLink>
            <NavLink to='/about' className='text-black font-semibold hover:text-gray-400 transition-colors py-2'>About</NavLink>
            <NavLink to='/products' className='text-black font-semibold hover:text-gray-400 transition-colors py-2'>Shop</NavLink>
            <NavLink to='/contact' className='text-black font-semibold hover:text-gray-400 transition-colors py-2'>Contact</NavLink>
            <NavLink to='/orders' className='text-black font-semibold hover:text-gray-400 transition-colors py-2'>Orders</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
