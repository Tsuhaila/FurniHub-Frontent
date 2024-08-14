import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";


export const Cart = () => {
  const navigate=useNavigate()
    const[cartItem,setCartItem]=useState([])

    useEffect(()=>{
        async function DisplayCartItems(){
          try{
            const userId=localStorage.getItem("id")
            const res=await axios.get(`http://localhost:3000/users/${userId}`)
            const cartList=res.data.cart
            setCartItem(cartList)   

          }catch(error){
            toast.warn("something went wrong")
            console.log(error)
           
        }
        }
        DisplayCartItems()
      

    },[])


 async function RemoveCart(item){
  try{
 const updatedCartItems=cartItem.filter(x=>x.id!==item.id)
  setCartItem(updatedCartItems)
const userId=localStorage.getItem("id")
 await axios.patch(`http://localhost:3000/users/${userId}`,{cart:updatedCartItems})
toast.success("item removed from the cart")
}catch(error){
 toast.warn("failed to remove item from the cart")
 console.log(error)
  }

 }

 function calculateTotal(){
    return cartItem.reduce((total,item)=>total+item.totalPrice,0)
  }
function handlePlaceOrder(){
  const totalAmount=calculateTotal()
  navigate('/placeorder',{state:{cartItem,totalAmount}})

}

  return (
    <div className="bg-gray-100 min-h-screen py-8">
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItem.length===0?(
        <p>you cart is empty</p>
      ):(
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
      )}
      {cartItem.length>0 &&(

      

      <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Total:</p>
          <p className="text-xl font-semibold">${calculateTotal()}</p>
        </div>
        <div className="mt-6 text-right">
          <button onClick={handlePlaceOrder} className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300">
            Place Order
          </button>
        </div>
      </div>
      )}
    </div>
  </div>

  
 
    
  )
}
