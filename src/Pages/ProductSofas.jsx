import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaArrowRight } from "react-icons/fa";

export const ProductSofas = () => {

    const[products,setProducts]=useState([])
useEffect(()=>{
    async function FetchProducts(){
        try{
            const res=await axios.get("http://localhost:3000/Sofas")
            setProducts(res.data.slice(0,6))
        }catch(error){
            console.log('error fetching products:',error)

        }
    }
    FetchProducts()
},[])
  return (
    <div className='p-6-gradient-to-r from-red-50 via-red-100 to-red-200'>
        <h1 className='text-3xl font-extrabold text-center text-red-700 mb-6'>Sofas</h1>
        <hr className='mb-6 border-red-400'/>
        <div>
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>{products.map(products=>(
              <Link to={`sofas/${products.id}`}>
                <li key={products.id} className='border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 hover:shadow-xl'>
                
                    <img src={products.image} alt={products.name} className='w-full h-100 object-cover'/>
                    <h2 className='text-xl font-semibold text-red-700 mb-2'>{products.name}</h2>
                    <p className='text-gray-600 mb-1'>Type:{products.type}</p>
                    <p className='text-gray-600 mb-1'>Price:${products.price}</p>
                </li>
                </Link>
            ))}
<div className='flex justify-center items-center'>
  <div className='p-4 rounded-full bg-white shadow-lg'>
    <Link to={'/sofas&seatings'}><FaArrowRight className='text-brown-700' /></Link>
  </div>
</div>

           
            </ul>
        </div>


    </div>
  )
}
