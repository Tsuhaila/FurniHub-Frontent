import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";
import { cartContext } from '../Context/CartProvider';


export const Orders = () => {
  const navigate=useNavigate()
  const [orders, setOrders] = useState([])
  const user=localStorage.getItem("id")

  useEffect(()=>{
     (async ()=>{
      try{
        const response=await axios.get(`http://localhost:3000/users/${user}`)
        if(response && response.data && response.data.orders){
          setOrders(response.data.orders)
         }
     
      }catch(error){
        console.log(error)
      }
      

    })()
  },[])


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
      onClick={() => navigate("/shoppage")} 
    >
      Continue Shopping
    </button>
  </div>
  
      ):(
        <div>
        <h2 className="text-2xl font-semibold mb-4">Your orders</h2>
      <ul className="space-y-4">
        {orders.map((item, index) => (
          <li key={index} className="flex items-center justify-between space-x-4 p-4 bg-white shadow-md rounded-lg">
            <img src={item.image} alt={item.product} className="w-24 h-24 object-cover rounded-md" />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p>quantity:{item.quantity}</p>
              <p className="text-gray-800 font-semibold mt-2">${item.price}</p>
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
