import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { editProduct, fetchProductById, fetchProducts } from '../../Redux/Slices/ProductSlice';
import { fetchCategories } from '../../Redux/Slices/CategorySlice';

export const EditProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams();
  const { product } = useSelector(state => state.product)
  const { categories } = useSelector(state => state.category)
  const initialValues = {
    name: '',
    description: '',
    price: '',
    offerPrice: '',
    image: null,
    categoryId: ''
  };

  const [inputvalue, setInputValue] = useState(initialValues);

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, dispatch)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setInputValue({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        offerPrice: product.offerPrice || '',
        image: null,
        categoryId: product.categoryId || ''
      });
    }
  }, [product]);
  console.log('edit', inputvalue)

  async function handleSubmit(e) {
    e.preventDefault();
    await dispatch(editProduct({ id, inputvalue }))


    navigate('/admin/allproducts');
    console.log('console', inputvalue);
  }

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

            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}

          </select>
        </div>
        <div className="text-center py-2">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 border border-gray-800 rounded-lg shadow"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
