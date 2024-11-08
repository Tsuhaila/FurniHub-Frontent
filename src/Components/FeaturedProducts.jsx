import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slices/CartSlice';
import { toast } from 'react-toastify';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch()
  const admin = localStorage.getItem("admin")
  const baseUrl = process.env.REACT_APP_BASE_URL


  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(baseUrl + '/products/paginated?page=1&limit=5');
        console.log(res)
        setProducts(res?.data?.result);

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

                <div className="flex items-center mb-4">
                            <span className="text-lg text-gray-500 line-through mr-2">
                                ${product.price}
                            </span>
                            <span className="text-xl font-semibold text-red-600">
                                ${product.offerPrice}
                            </span>
                        </div></Link>
              <button
                disabled={admin ? true : false}
                onClick={() =>{
                  if(product.quantity<1){
                      toast.warn("out of stock")
                  }else{
                      dispatch(addToCart(product.id))
                  }
                                             }
              } className="mt-6 w-full  text-black py-2 px-4 rounded-lg border-2 border-black hover:bg-black hover:text-white transition duration-300">
                Add to Cart
              </button>
            </div>
          ))}
          <div className='flex justify-center items-center'>
            <div className='p-4 rounded-full bg-white shadow-lg'>
              <Link to={'/products'}><FaArrowRight className='text-brown-700' /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
