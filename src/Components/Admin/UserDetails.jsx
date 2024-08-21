import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const UserDetails = () => {
    const {id}=useParams()
    const[user,setUser]=useState(null)
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res= await axios.get(`http://localhost:3000/users/${id}`)
                setUser(res.data)
               
            }catch(error){
                console.log(error)
            }
          
        }
        fetchUser()

    },[id])
    if(!user){
        return <div>Loading...</div>
    }
  return (
<div>
  <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
      {user.username}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">Email: {user.email}</p>
    <p className="font-normal text-gray-700 dark:text-gray-400">Name: {user.paymentDetails?.full_Name}</p>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      Address: {user.paymentDetails?.address}, {user.paymentDetails?.city}, {user.paymentDetails?.state}, {user.paymentDetails?.postal_Code}, {user.paymentDetails?.country}
    </p>
    <p className="font-normal text-gray-700 dark:text-gray-400">Phone: {user.paymentDetails?.phone}</p>
  </div>

  <h4 className="text-lg font-semibold mt-4">Orders:</h4>
  {user.orders && user.orders.length > 0 ? (
  <p className='flex flex-col gap-4'>
      {user.orders.map((order) => (
        <div key={order.id} className="flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="mr-4">
            <img src={order.image} alt={order.name} className="w-20 h-20 object-cover rounded-md"/>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-400">{order.name}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">Id: {order.id}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">Price: {order.price}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">Quantity: {order.quantity}</p>
          </div>
        
        </div>
      ))}
      </p>
   
  ) : (
    <p className="text-gray-500">No orders placed.</p>
  )}
</div>

   
  
//    <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">User Details</h2>
//             <div className="border p-4 mb-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
//                  <p className="text-gray-600">Email: {user.email}</p>
//                 <p className="text-gray-600">Name: {user.paymentDetails?.full_Name}</p>
//                 <p className="text-gray-600">
                    
//                     Address: {user.paymentDetails?.address}, {user.paymentDetails?.city}, {user.paymentDetails?.state}, {user.paymentDetails?.postal_Code}, {user.paymentDetails?.country}
//                   </p>
//                 <p className="text-gray-600">Phone: {user.paymentDetails?.phone}</p>

//                 <h4 className="text-lg font-medium mt-4">Cart Items:</h4>
//                 {user.cart && user.cart.length > 0 ? (
//                     <ul className="list-disc pl-5">
//                         {user.cart.map((item) => (
//                             <li key={item.id} className="text-gray-700">
//                                <img src={item.image}alt={item.name} class="w-20 h-20 object-cover"></img>
//                                 {item.name} - {item.quantity} x ${item.price} = ${item.totalPrice}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-gray-500">No items in cart.</p>
//                 )}

//                 <h4 className="text-lg font-medium mt-4">Orders:</h4>
//                 {user.orders && user.orders.length > 0 ? (
//                     <ul className="list-disc pl-5">
//                         {user.orders.map((order) => (
//                             <li key={order.id} className="text-gray-700">
//                                 {order.name} - {order.quantity} x ${order.price} = ${order.totalPrice}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-gray-500">No orders placed.</p>
//                 )}
//             </div>
//         </div> 
       
)
}
