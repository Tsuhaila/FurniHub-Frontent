import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export const AddProducts = () => {
  const initialValues = {

    name: "",
    description: "",
    price: "",
    image: "",
    rating: "",
    material: "",
    category: ""
  }
  const [product, setProduct] = useState(initialValues)


  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault()

      await axios.post('http://localhost:3000/products', product)
      toast.success('product added successfully')


      setProduct(initialValues)

    } catch (error) {
      console.log(error)
      toast.warn("can't add product. please try again")

    }



  }


  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Products</h2>


      <form class=" max-w-2xl mx-auto" onSubmit={handleSubmit}>

        <div className="mb-5">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input required onChange={handleChange} type="text" id="base-input" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        <div className="mb-5">
          <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <input required onChange={handleChange} type="text" id="large-input" name="description" class="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        <div className="mb-5">
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input required onChange={handleChange} type="number" id="small-input" name="price" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        <div className="mb-5">
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
          <input required onChange={handleChange} type="text" id="small-input" name="image" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>

        <div className="mb-5">
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
          <input required onChange={handleChange} type="number"   min="1" max="5" id="small-input" name="rating" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        <div className="mb-5">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material</label>
          <input required onChange={handleChange} type="text" id="base-input" name="material" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        <div className="mb-5">
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">category</label>
          <select required onChange={handleChange} type="text" id="small-input" name="category" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Select a category</option>
            <option>Sofas</option>
            <option>Beds</option>
            <option>Tables</option>
          </select>
        </div>
        <div className='text-center py-2'>
          <button type='submit' class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Add
          </button>

        </div>


      </form>
    </div>

  )
}
