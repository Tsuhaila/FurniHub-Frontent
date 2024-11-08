import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, fetchCart, increaseQuantity, removeCart } from '../../Redux/Slices/CartSlice';


export const Cart = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  console.log(cart.result);

  const navigate = useNavigate()
useEffect(()=>{
  dispatch(fetchCart())
},[dispatch])

function calculateTotal() {
  return cart?.result?.reduce((total, item) => total + item.offerPrice * item.quantity, 0);
}
  function handlePlaceOrder() {
    navigate('/placeorder')
  }
 

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto mt-8">

        {!cart || !cart.result || cart.result?.length === 0 ? (
          <div className="text-center py-8 bg-gray-100">
            <p className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</p>
            <p className="text-gray-600 mb-6">
              It seems like you haven't added any items to your cart yet.
            </p>
            <button
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>

        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            <ul className="space-y-4">
              {cart?.result?.map((item, index) => (
                <li key={index} className="flex items-center justify-between space-x-4 p-4 bg-white shadow-md rounded-lg">
                  <Link to={`products/${item.id}`}>
                  <img src={item.image} alt={item.product} className="w-24 h-24 object-cover rounded-md" />
                  </Link>
                  <div className="flex-1">
                  
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.productName}
                    </h2>
                    

                    <p className="text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-2">
                      <label className="font-semibold text-gray-600">Quantity:</label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-l-md"
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 w-full flex items-center space-x-4">
                       


                    </div>
                    <div className="mt-2">
          <span className="text-gray-600 line-through">${item.price * item.quantity}</span>
          <span className="ml-2 text-green-600 font-semibold">${item.offerPrice * item.quantity}</span>
        </div>
                   
                  </div>
                  
                  <div>
                    <MdDelete
                      onClick={() => dispatch(removeCart(item.id))}
                      className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200"
                      size={24}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
       {cart?.result?.length > 0 && (
  <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
    <div className="space-y-2">
    <p className="flex justify-between text-gray-600">
        <span>Subtotal:</span>
        <span>${cart?.result?.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
      </p>
      <p className="flex justify-between text-gray-600">
        <span>Discount:</span>
        <span className="text-green-600">
          ${cart?.result?.reduce((total, item) => total + (item.price - item.offerPrice) * item.quantity, 0)}
        </span>
      </p>
      <p className="flex justify-between text-gray-600">
        <span>Shipping:</span> <span className="text-green-600">Free</span>
      </p>
    </div>
    <div className="mt-4 border-t pt-4">
      <p className="flex justify-between text-xl font-semibold text-gray-800">
        <span>Total:</span> <span>${calculateTotal()}</span>
      </p>
    </div>
    <button
      onClick={handlePlaceOrder}
      className="w-full py-3 text-white bg-gray-700 hover:bg-gray-800 rounded-md font-semibold transition-colors duration-200"
    >
      Proceed to order
    </button>
  </div>
)}

      </div>
    </div>
  )
}
