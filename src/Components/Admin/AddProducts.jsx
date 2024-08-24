import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AddProducts = () => {
  const navigate = useNavigate()
  const initialValues = {
    name: "",
    description: "",
    price: "",
    image: "",
    rating: "",
    material: "",
    category: "",
    manufacturer: "",
    colors: [],
    features: []
  }
  const [product, setProduct] = useState(initialValues)
  const [featureInput, setFeatureInput] = useState('')
  const [colorInput, setColorInput] = useState('')

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleFeatureAdd = () => {
    if (featureInput && !product.features.includes(featureInput)) {
      setProduct(prevProduct => ({
        ...prevProduct,
        features: [...prevProduct.features, featureInput],
      }))
      setFeatureInput('')
    }
  }

  const handleColorAdd = () => {
    if (colorInput && !product.colors.includes(colorInput)) {
      setProduct(prevProduct => ({
        ...prevProduct,
        colors: [...prevProduct.colors, colorInput],
      }))
      setColorInput('')
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      await axios.post('http://localhost:3000/products', product)
      toast.success('Product added successfully')
      navigate('/admin/allproducts')
      setProduct(initialValues)
    } catch (error) {
      console.log(error)
      toast.warn("Can't add product. Please try again")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Add Products</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder='Enter product name'
            value={product.name}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder='Enter description'
            value={product.description}
            onChange={handleChange}
            required
            className="block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder='Enter price'
            min="0"
            value={product.price}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-700">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder='Enter image url'
            value={product.image}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rating" className="block mb-1 text-sm font-medium text-gray-700">Rating</label>
          <input
            id="rating"
            name="rating"
            type="number"
            placeholder='Enter rating'
            min="1"
            max="5"
            value={product.rating}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="material" className="block mb-1 text-sm font-medium text-gray-700">Material</label>
          <input
            id="material"
            name="material"
            type="text"
            placeholder='Enter material'
            value={product.material}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select a category</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
            <option value="Tables">Tables</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="manufacturer" className="block mb-1 text-sm font-medium text-gray-700">Manufacturer</label>
          <input
            id="manufacturer"
            name="manufacturer"
            type="text"
            placeholder="Enter manufacturer"
            value={product.manufacturer}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Features</label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}

              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter feature"
            />
            <button
              type="button"
              onClick={handleFeatureAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div>
            {product.features.length > 0 && product.features.map((feature, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-2 text-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Colors</label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}

              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter color"
            />
            <button
              type="button"
              onClick={handleColorAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div>
            {product.colors.length > 0 && product.colors.map((color, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-2 text-sm">
                {color}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}
