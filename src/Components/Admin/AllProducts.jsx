import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AllProducts = () => {
    const[products,setProducts]=useState([])
    const[category,setCategory]=useState('')
  

  useEffect(()=>{
   async function fetchProducts(){
    try{
      const res=await axios.get('http://localhost:3000/products')
      const filteredProducts=category?
      res.data.filter(data=>data.category==category):
      res.data
      setProducts(filteredProducts)

    }catch(error){
      console.log(error)
    }

   }
   fetchProducts()
      
  },[category])

 async function handleDelete(item){
    try{
      const updatedItems=products.filter((x)=>x.id!==item.id)
    setProducts(updatedItems)
    await axios.delete(`http://localhost:3000/products/${item.id}`)
    toast.success('Product deleted successfully')
    }catch(error){
      console.log(error)
      toast.warn('failed to delete product. please try again')
    }

  }



  return (
    <div>
      

<div className="relative overflow-x-auto">
<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{category ? category : "All Products"}</h2>
                <div className='w-full max-w-xs mx-auto mb-10'>
                    <label htmlFor="category-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Category
                    </label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        id="category-select"
                        name="category"
                        className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm hover:bg-gray-200 transition-colors duration-200 ease-in-out cursor-pointer"
                    >
                        <option value="">All Categories</option>
                        <option>Sofas</option>
                        <option>Beds</option>
                        <option>Tables</option>
                    </select>
                </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    image
                </th>
                <th scope="col" class="px-6 py-3">
                    price
                </th>
               
            </tr>
        </thead>
        <tbody>
          {products.map(item=>(
             <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              
             <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {item.id}
             </th>
             <td class="px-6 py-4">
             {item.name}
             </td>
             <td class="px-6 py-4">
              <img src={item.image}alt={item.name} class="w-20 h-20 object-cover"></img>
              
             </td>
             <td class="px-6 py-4">
                {item.price}
             </td>
             <td class="px-6 py-4">
               <Link to={`${item.id}`}><button>Edit</button></Link>
             </td>
             <td class="px-6 py-4">
               <button onClick={()=>handleDelete(item)}>Delete</button>
             </td>
             
         </tr>

          ))}
           
        </tbody>
    </table>
</div>

    </div>
  )
    
 
}

