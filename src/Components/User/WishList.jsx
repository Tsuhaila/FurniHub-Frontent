import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, toggleWishlist } from '../../Redux/Slices/WishlistSlice';
import { addToCart } from '../../Redux/Slices/CartSlice';

export const WishList = () => {
    const dispatch=useDispatch()
    const{wishlist}=useSelector(state=>state.wishlist)
    console.log(wishlist);
    

    useEffect(()=>{
        dispatch(fetchWishlist())

    },[dispatch])
    
    const isWishlist=(productId)=>{
        return wishlist.some(item=>item.productId==productId)
    }
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>

        {wishlist?.length === 0 ? (
          <p className="text-center text-gray-500">
            Your wishlist is currently empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist?.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg relative hover:shadow-xl transition-shadow"
              >
               
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
                  onClick={() => dispatch(toggleWishlist(item.productId))}
                  aria-label="Toggle Wishlist"
                >
                  {isWishlist(item.productId) ? (
                    <AiFillHeart className="h-6 w-6 text-red-500" />
                  ) : (
                    <AiOutlineHeart className="h-6 w-6" />
                  )}
                </button>

               
                <Link to={`/products/${item.productId}`} className="block mb-4">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.productName}
                  </h2>
                  <p className="text-gray-500 text-sm mb-1">
                    {item.categoryName}
                  </p>
                  <p className="text-gray-900 font-bold text-lg mt-1">
                    ₹{item.price}
                  </p>
                </Link>

               
                <button
                  className="mt-4 w-full bg-gray-700 text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                  onClick={() => dispatch(addToCart(item.productId))}
                >
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

  
    </>
  );
};


