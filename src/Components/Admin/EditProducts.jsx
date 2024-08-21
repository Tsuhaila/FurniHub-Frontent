import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const EditProducts = () => {
    const navigate=useNavigate()
    const {id}=useParams()
    const initialValues={
        
        name:"",
        description:"",
        price:"",
        image:"",
        rating:"",
        material:"",
        category:""
      }
    const[editproduct,setEditProduct]=useState(initialValues)
    useEffect(()=>{
     async function fetchProduct(){
      try{
        const res= await axios.get(`http://localhost:3000/products/${id}`)
        setEditProduct(res.data)

      } catch(error){
        console.log(error)
      }

      }
      fetchProduct()

    },[])
    async function handleSubmit(e) {
        e.preventDefault() 
        try{
            await axios.put(`http://localhost:3000/products/${id}`, editproduct)
            toast.success('Product updated successfully')
            navigate('/admin/allproducts')

            

        }catch(error) {
                console.log("Error updating product", error)
            }
    }

function handleChange(e){
    setEditProduct({...editproduct,[e.target.name]:e.target.value})




}
    
  return (
    <div>
           
<form class=" max-w-2xl mx-auto" onSubmit={handleSubmit}>
 
  <div className="mb-5">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
      <input onChange={handleChange} value={editproduct.name} type="text" id="base-input" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
  </div>
    <div className="mb-5">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
      <input onChange={handleChange} value={editproduct.description} type="text" id="large-input" name="description" class="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
  </div>
  <div className="mb-5">
      <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
      <input onChange={handleChange} value={editproduct.price} type="number" id="small-input" name="price" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
  </div>
  <div className="mb-5">
      <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
      <input onChange={handleChange} value={editproduct.image} type="text" id="small-input" name="image" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
  </div>
  
  <div className="mb-5">
      <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
      <input onChange={handleChange} value={editproduct.rating} type="text" id="small-input" name="rating" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
  </div>
  <div className="mb-5">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material</label>
      <input onChange={handleChange} value={editproduct.material} type="text" id="base-input" name="material" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
  </div>
  <div className="mb-5">
      <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">category</label>
      <select onChange={handleChange} value={editproduct.category} type="text" id="small-input" name="category" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option>Sofas</option>
        <option>Beds</option>
      </select>
  </div>
  <div className='text-center py-2'>
  <button type='submit' class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
  save
</button>

  </div>
 

</form>
    </div>
  )
}
