import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import { HandleCart } from '../Cart/HandleCart';
import { FaArrowRight } from "react-icons/fa";
import { toast } from 'react-toastify';
import { cartContext } from '../Context/CartProvider';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState([]);
  const {AddToCart} = useContext(cartContext)
  const navigate = useNavigate()

  // Fetch products from the API on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/products?_limit=5');
        setProducts(res.data);
        setRecords(res.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const HandleCart = async (item) => {

    const user = localStorage.getItem("id");

    if (user) {
        try {
            const res = await axios.get(`http://localhost:3000/users/${user}`);
            const currentCart = res.data.cart;
            const itemExists = currentCart.find(cartItem => cartItem.id === item.id);
            if (itemExists) {
                toast.warn("item is already in the cart")
                navigate('/cart')
            } else {
                const updatedCart = [...currentCart, { ...item, quantity:1, totalPrice: (item.price) }]
                await axios.patch(`http://localhost:3000/users/${user}`, { cart: updatedCart });
                toast.success("item successfully added to cart");
                navigate('/cart')
            }

        } catch (error) {
            toast.warn("Something went wrong");
            console.log(error);
        }
    } else {
        toast.warn("Please Login")
        navigate('/login')


    }

};

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mt-20">Featured Products</h2>
        <div className="flex justify-center mb-8">
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-800 font-bold mt-4">${product.price}</p>
             <button onClick={()=>AddToCart(product, 1)} className="mt-6 w-full bg-brown-700 text-black border-black py-2 hover:bg-brown-800 transition-colors duration-300 px-6  bg-white font-semibold rounded-lg border-2  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Add to Cart
              </button>
            </div>
          ))}
          <div className='flex justify-center items-center'>
  <div className='p-4 rounded-full bg-white shadow-lg'>
    <Link to={'/featuredProducts'}><FaArrowRight className='text-brown-700' /></Link>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};
