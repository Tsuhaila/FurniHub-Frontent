import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, fetchProductById } from '../../Redux/Slices/ProductSlice'
import { fetchCategories } from '../../Redux/Slices/CategorySlice'

export const AddProducts = () => {
  const navigate = useNavigate()
  const initialValues = {
    name: '',
    description: '',
    price: '',
    offerPrice: '',
    image: null,
    quantity:'',
    categoryId: ''
  }
  const [inputvalue, setInputValue] = useState(initialValues)
  const dispatch = useDispatch()
  const{categories}=useSelector(state=>state.category)
  console.log(categories);
  

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'image') {
      setInputValue({ ...inputvalue, image: e.target.files[0] })
    } else {
      setInputValue({
        ...inputvalue, [name]: value

      });

    }

  }
  async function handleSubmit(e) {
    try {
      e.preventDefault()
      console.log(inputvalue);
      
      await dispatch(addProduct(inputvalue))
      toast.success('Product added successfully')
      // navigate('/admin/allproducts')
      setInputValue(initialValues)
    } catch (error) {
      console.log(error)
      toast.warn("Can't add product. Please try again")
    }
  }
  useEffect(()=>{
dispatch(fetchCategories())
  },[dispatch])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Add Products</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            onChange={handleChange}
            value={inputvalue.name}
            type="text"
            id="name"
            name="name"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <input
            onChange={handleChange}
            value={inputvalue.description}
            type="text"
            id="description"
            name="description"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
            Price
          </label>
          <input
            onChange={handleChange}
            value={inputvalue.price}
            type="number"
            id="price"
            name="price"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="offerPrice" className="block mb-2 text-sm font-medium text-gray-900">
            Offer Price
          </label>
          <input
            onChange={handleChange}
            value={inputvalue.offerPrice}
            type="number"
            id="offerPrice"
            name="offerPrice"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
            Image
          </label>
          <input
            onChange={handleChange}

            type="file"
            id="image"
            name="image"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">
            Quantity
          </label>
          <input
            onChange={handleChange}
            value={inputvalue.quantity}
            type="number"
            id="quantity"
            name="quantity"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-5 mt-10">
          <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={inputvalue.categoryId}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select a category</option>
            {categories.map(c=>(
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
            
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}
