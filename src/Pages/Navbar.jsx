import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../Context/CartProvider';

export const Navbar = () => {
  const navigate=useNavigate()
  const [isLoggin, setIsLoggin] = useState(false);
  const user=localStorage.getItem("name")
 const[searchQuery,setSearchQuery]=useState("")
 const {cartItem} = useContext(cartContext)

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

  async function handleSearch(e) {
    const query=e.target.value
    setSearchQuery(query)
    if(!query){
      navigate('/')
      return
    }
    e.preventDefault()
  
    try{
      const result=await axios.get("http://localhost:3000/products")
      const combinedResult=result.data
      const filteredResult=combinedResult.filter((item)=>item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      navigate('/search',{state:{results:filteredResult}})


    }catch(error){
      console.log(error)

    }
    
}

  return (
    <nav className='p-4 shadow-md flex items-center justify-between sticky top-0 z-50 bg-white'>
      <div>
      <p className="text-md">Furnihub</p>
      </div>
      <div>
      <input
                        type="text"
                        placeholder="Search products..."
                        onChange={handleSearch}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                    />

      </div>
      <div className='flex gap-5'>
      <NavLink to='/' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Home</NavLink>
        <NavLink to='/about' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>About</NavLink>
        <NavLink to='/shoppage' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Shop</NavLink>
        <NavLink to='/contact' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Contact</NavLink>
        <NavLink to='/orders' className={({ isActive }) => `text black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>Orders</NavLink>

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
       
       <NavLink to='/cart' className={({ isActive }) => `relative text-black h-5 w-5 font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-gray-900' : ''}`}>
  <FaShoppingCart />
  <p className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]'>
    {cartItem.length}
  </p>
</NavLink>


      </div>

    </nav>




  );
};
