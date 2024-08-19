import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { cartContext } from '../Context/CartProvider';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { AddToCart } = useContext(cartContext)



  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/products?_limit=5');
        setProducts(res.data);

      } catch (error) {
        console.log('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mt-20">Featured Products</h2>
        <div className="flex justify-center mb-8">

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (

            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>
                <p>
                  <span className="font-semibold mr-1">Material:</span>
                  {product.material}
                </p>
                <p>
                  <span className="font-semibold mr-1">Rating:</span>
                  {product.rating}
                </p>
                <p className="text-gray-800 font-bold mt-4">${product.price}</p></Link>
              <button onClick={() => AddToCart(product, 1)} className="mt-6 w-full bg-brown-700 text-black border-black py-2 hover:bg-brown-800 transition-colors duration-300 px-6  bg-white font-semibold rounded-lg border-2  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700">
                Add to Cart
              </button>
            </div>
          ))}
          <div className='flex justify-center items-center'>
            <div className='p-4 rounded-full bg-white shadow-lg'>
              <Link to={'/shoppage'}><FaArrowRight className='text-brown-700' /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
