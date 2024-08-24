import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const EditProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialValues = {
    name: '',
    description: '',
    price: '',
    image: '',
    rating: '',
    material: '',
    category: '',
    manufacturer: '',
    reviews: '',
    features: [],
    colors: [],
  };
  
  const [editproduct, setEditProduct] = useState(initialValues);
  const [featureInput, setFeatureInput] = useState('')
  const [colorInput, setColorInput] = useState('')

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setEditProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [id]);

  
  const handleFeatureAdd = () => {
    if (featureInput && !editproduct.features.includes(featureInput)) {
      setEditProduct(prevProduct => ({
        ...prevProduct,
        features: [...prevProduct.features, featureInput],
      }))
      setFeatureInput('')
    }
  }

  const handleColorAdd = () => {
    if (colorInput && !editproduct.colors.includes(colorInput)) {
      setEditProduct(prevProduct => ({
        ...prevProduct,
        colors: [...prevProduct.colors, colorInput],
      }))
      setColorInput('')
    }
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${id}`, editproduct);
      toast.success('Product updated successfully');
      navigate('/admin/allproducts');
    } catch (error) {
      console.log('Error updating product', error);
    }
  }

  function handleChange(e) {
    setEditProduct({ ...editproduct, [e.target.name]: e.target.value });
  }

 
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Products</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            onChange={handleChange}
            value={editproduct.name}
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
            value={editproduct.description}
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
            value={editproduct.price}
            type="number"
            id="price"
            name="price"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
            Image
          </label>
          <input
            onChange={handleChange}
            value={editproduct.image}
            type="text"
            id="image"
            name="image"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900">
            Rating
          </label>
          <input
            onChange={handleChange}
            value={editproduct.rating}
            type="text"
            id="rating"
            name="rating"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        
        {/* <div className="mb-5">
          <label htmlFor="reviews" className="block mb-2 text-sm font-medium text-gray-900">
            Reviews
          </label>
          <input
            required
            onChange={handleChange}
            value={editproduct.reviews}
            type="text"
            id="reviews"
            name="reviews"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div> */}
        
        <div className="mb-5">
          <label htmlFor="material" className="block mb-2 text-sm font-medium text-gray-900">
            Material
          </label>
          <input
            onChange={handleChange}
            value={editproduct.material}
            type="text"
            id="material"
            name="material"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
            Category
          </label>
          <select
            onChange={handleChange}
            value={editproduct.category}
            id="category"
            name="category"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          >
            <option value="">Select Category</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </div>
        
        <div className="mb-5">
          <label htmlFor="manufacturer" className="block mb-2 text-sm font-medium text-gray-900">
            Manufacturer
          </label>
          <input
            required
            onChange={handleChange}
            value={editproduct.manufacturer}
            type="text"
            id="manufacturer"
            name="manufacturer"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
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
            {editproduct.features.length > 0 && editproduct.features.map((feature, index) => (
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
            {editproduct.colors.length > 0 && editproduct.colors.map((color, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-2 text-sm">
                {color}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-center py-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded-lg shadow"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
