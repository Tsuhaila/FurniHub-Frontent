import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
        <nav className='p-1 bg-gradient-to-r shadow-md flex items-center justify-between'>
          <img src='' alt='logo' className='h-12 w-auto rounded-full'/>
<div></div>
          <div className='flex space-x-4'>
            <NavLink to={'/'}className={({isActive})=>`text-black font-semibold hover:text-black-200 transition-colors ${isActive?'border-b-2 border-red-600':""}`}>Home</NavLink>
            <NavLink to={'/furniture'}className={({isActive})=>`text-black font-semibold hover:text-black-200 transition-colors ${isActive?'border-b-2 border-red-600':""}`}>Furniture</NavLink>
            
            <NavLink to={'/login'}className={({isActive})=>`text-black font-semibold hover:text-black-200 transition-colors ${isActive?'border-b-2 border-red-600':""}`}>Login</NavLink>
            <NavLink to={'/contactus'}className={({isActive})=>`text-black font-semibold hover:text-black-200 transition-colors ${isActive?'border-b-2 border-red-600':""}`}>Contact us</NavLink>
           
            </div>
            <div></div>
        </nav>
        

   
  )
}
