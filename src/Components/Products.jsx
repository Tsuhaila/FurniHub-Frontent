import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { fetchWishlist, toggleWishlist } from '../Redux/Slices/WishlistSlice';
import { fetchProductByCategory, fetchProducts } from '../Redux/Slices/ProductSlice';

export const Products = () => {
    
    const [category, setCategory] = useState();
    const dispatch = useDispatch()
    const { wishlist } = useSelector(state => state.wishlist)
    const {products}=useSelector(state=>state.product)
    const baseUrl = process.env.REACT_APP_BASE_URL


    useEffect(() => {
        if (category) {
            dispatch(fetchProductByCategory(category));
        } else {
            dispatch(fetchProducts());
        }
    }, [category, dispatch]);

    const handleWishlist = (productId) => {
        dispatch(toggleWishlist(productId))
        dispatch(fetchWishlist())
        console.log(wishlist);
    };

    const isWishlist = (productId) => {
        return wishlist.some(item => item.productId == productId)
    };
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{category ? category : "All Products"}</h2>
                <div className='w-full max-w-xs mx-auto mb-10'>
                    <label htmlFor="category-select" className="block mb-2 text-sm font-medium text-gray-900 ">
                        Select Category
                    </label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        id="category-select"
                        name="category"
                        className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                    >
                        <option value="">All Categories</option>
                        <option>Sofas</option>
                        <option>Beds</option>
                        <option>Tables</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {products?.result?.map((product, index) => (

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
                            <p className="text-gray-500 text-sm mb-1">
                    {product.category}
                  </p>

                            <div className="flex items-center mb-4">
                            <span className="text-lg text-gray-500 line-through mr-2">
                                ${product.price}
                            </span>
                            <span className="text-xl font-semibold text-red-600">
                                ${product.offerPrice}
                            </span>
                        </div>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
};
