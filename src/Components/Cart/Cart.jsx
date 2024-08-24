import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { cartContext } from '../../Context/CartProvider';



export const Cart = () => {
  const navigate = useNavigate()
  const { cartItem, RemoveCart } = useContext(cartContext)

  function calculateTotal() {
    return cartItem.reduce((total, item) => total + item.totalPrice, 0)
  }
  function handlePlaceOrder() {
    const totalAmount = calculateTotal()
    navigate('/placeorder', { state: { cartItem, totalAmount } })

  }



  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto mt-8">

        {cartItem.length === 0 ? (
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
              {cartItem.map((item, index) => (
                <li key={index} className="flex items-center justify-between space-x-4 p-4 bg-white shadow-md rounded-lg">
                  <img src={item.image} alt={item.product} className="w-24 h-24 object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p>quantity:{item.quantity}</p>
                    <p className="text-gray-800 font-semibold mt-2">${item.price}</p>
                  </div>
                  <div>
                    <MdDelete
                      onClick={() => RemoveCart(item)}
                      className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200"
                      size={24}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {cartItem.length > 0 && (



          <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">Total:</p>
              <p className="text-xl font-semibold">${calculateTotal()}</p>
            </div>
            <div className="mt-6 text-right">
              <button onClick={handlePlaceOrder} className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300">
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>




  )
}
