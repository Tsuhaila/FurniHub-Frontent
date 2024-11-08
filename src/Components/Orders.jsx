import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const baseUrl = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(baseUrl + `/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        console.log(response.data)
        if (response && response.data) {
          setOrders(response.data)
        }

      } catch (error) {
        console.log(error)
      }


    })()
  }, [])


  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto mt-8">

        {orders.length === 0 ? (
          <div className="text-center py-8 bg-gray-100">
            <p className="text-2xl font-semibold text-gray-800 mb-4">No orders</p>
            <p className="text-gray-600 mb-6">
              It seems like you haven't ordered any items yet.
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
            <h2 className="text-2xl font-semibold mb-4">Your orders</h2>
            <ul className="space-y-4">
              {orders.map((item, index) => (
                <li key={index} className="flex items-center justify-between space-x-4 p-4 bg-white shadow-md rounded-lg">
                  <img src={item.image} alt={item.product} className="w-24 h-24 object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.productName}</h3>

                    <p>quantity: {item.quantity}</p>
                    <p>Order Id: {item.orderId}</p>
                    <p>Order Date: {item.orderDate}</p>
                    <p className="text-gray-800 font-semibold mt-2">${item.totalAmount}</p>

                  </div>

                </li>
              ))}
            </ul>
          </div>
        )}
      </div>




    </div>





  )
}
