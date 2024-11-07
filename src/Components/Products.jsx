import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { fetchWishlist, toggleWishlist } from '../Redux/Slices/WishlistSlice';

export const Products = () => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();
    const dispatch=useDispatch()
    const {wishlist}=useSelector(state=>state.wishlist)
    const baseUrl = process.env.REACT_APP_BASE_URL


    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get(baseUrl + "/products");
                console.log(res.data);



                const filteredProducts = await axios.get(baseUrl + `/products/category-name/${category}`);

                setProducts(filteredProducts.data.length > 0 ? filteredProducts.data : res.data);
                console.log(products)
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [category]);

    const handleWishlist = (productId) => {
       dispatch(toggleWishlist(productId))
       dispatch(fetchWishlist())
       console.log(wishlist);
       
      };
    
    
      const isWishlist = (productId) => {
        return wishlist.some(item=>item.productId==productId)   
      };
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {products.map((product, index) => (
                        
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
                                <Link to={`/products/${product.id}`} key={index}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                                </Link>
                                 <button
                onClick={() => handleWishlist(product.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
              >
                {isWishlist(product.id) ? (
                  <AiFillHeart size={24} className="text-red-500" />
                ) : (
                  <AiOutlineHeart size={24} className="text-gray-500" />
                )}
              </button>
                                <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>

                                <p>
                                    <span className="font-semibold mr-1">price:</span>
                                    {product.price}
                                </p>
                                <p>
                                    <span className="font-bold mr-4">offer Price:</span>
                                    {product.offerPrice}
                                </p>
                            </div>
                        
                    ))}
                </div>
            </div>
        </section>
    );
};
