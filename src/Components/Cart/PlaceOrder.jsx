import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartProvider';
import { toast } from 'react-toastify';

export const PlaceOrder = () => {
  const navigate = useNavigate()
  const { clearCart } = useContext(cartContext)
  const location = useLocation();
  const { cartItem, totalAmount } = location.state;
  const [paymentDetails, setPaymentDetails] = useState({
    full_Name: "",
    address: "",
    city: "",
    state: "",
    postal_Code: "",
    country: "",
    phone: ""

  })

  function handleChange(e) {
    const { name, value } = e.target
    setPaymentDetails({ ...paymentDetails, [name]: value })

  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const user = localStorage.getItem("id")
      const existingUser = await axios.get(`http://localhost:3000/users/${user}`)
      const existingOrder = existingUser.data?.orders
      let updatedOrders;
      if (existingOrder) {
        updatedOrders = existingOrder;
        
        updatedOrders.push(...cartItem);
      } else {
        updatedOrders = cartItem
      }

      await axios.patch(`http://localhost:3000/users/${user}`, {
        paymentDetails: paymentDetails,
        orders: updatedOrders

      })
      clearCart()
      toast.success("Ordered Successfully")
      navigate('/orders')


    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">Shipping Address</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="full_Name"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Your address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postal_Code"
                    placeholder="Postal Code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="Phone no"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
              >
                Continue to Payment
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">Order Summary</h2>
            <ul className="space-y-4">
              {cartItem.map((item, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t pt-4">
              <p className="text-xl font-semibold">Total: ${totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
