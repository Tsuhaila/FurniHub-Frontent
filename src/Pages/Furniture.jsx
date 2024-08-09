// import React, { useEffect, useState } from 'react'

// import axios from 'axios'


// export const Furniture = () => {

//     const[products,setProducts]=useState([])
//     const[records,setRecords]=useState([])
// useEffect(()=>{
//     async function FetchProducts(){
//         try{
//             const res=await axios.get("http://localhost:3000/products")
//             setProducts(res.data)
//             setRecords(res.data)

//         }catch(error){
//             console.log('error fetching products:',error)

//         }
//     }
//     FetchProducts()
// },[])
// function handleSearch(e){
//     setProducts(records.filter(item=>item.name.toLowerCase().includes(e.target.value.toLowerCase())))

    
// }
//   return (
//     <div className='p-6-gradient-to-r from-red-50 via-red-100 to-red-200'>
//         <h1 className='text-3xl font-extrabold text-center text-red-700 mb-6'>Furniture</h1>
//         <div className='flex justify-center mb-6'>
//             <input
//             type='text'
//             placeholder='Search...'
//             className='w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline'
//             onChange={handleSearch}/>
//         </div>
//         <hr className='mb-6 border-red-400'/>
//         <div>

//             <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>{products.map(products=>(
//                 <li key={products.id} className='border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 hover:shadow-xl'>
                
//                     <img src={products.image} alt={products.name} className='w-full h-100 object-cover'/>
//                     <h2 className='text-xl font-semibold text-red-700 mb-2'>{products.name}</h2>
//                     <p className='text-gray-600 mb-1'>Type:{products.type}</p>
//                     <p className='text-gray-600 mb-1'>Price:${products.price}</p>
//                 </li>
//             ))}


           
//             </ul>
//         </div>


//     </div>
//   )
// }

import React from 'react'
import sofas from '../Assets/sofas.webp'
import beds from '../Assets/Beds.webp'
import { Link } from 'react-router-dom'

export const Furniture = () => {
  return (
    
    <div>
        <div className='p-6-gradient-to-r from-red-50 via-red-100 to-red-200'>
            <br></br>
            <br></br>
                <h1 className='text-3xl font-extrabold text-center text-indigo-950 mb-10'>Shop By Categories</h1>
         <div>
           <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
           <Link to={'/sofas'}><li  className='border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 hover:shadow-xl'>
                
                         <img src={sofas} alt="sofas" className='w-full h-100 object-cover'/>
                            <h1 className='text-xl font-semibold text-indigo-950 mb-2'>SOFAS</h1></li></Link>
                             <Link to={'/beds'}><li  className='border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 hover:shadow-xl'>
                
                         <img src={beds} alt="sofas" className='w-full h-100 object-cover'/>
                            <h1 className='text-xl font-semibold text-indigo-950 mb-2'>BEDS</h1></li></Link>
           </ul>
           </div>
    </div>
    </div>
  )
}
