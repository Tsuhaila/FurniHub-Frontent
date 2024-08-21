import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const Dashboard = () => {

  const[users,setUsers]=useState([])
  const[products,setProducts]=useState([])
  const[orders,setOrders]=useState([])

  useEffect(()=>{
   async function fetch(){
    try{
      const response=await axios.get('http://localhost:3000/products')
      setProducts(response.data)
      const res=await axios.get('http://localhost:3000/users')
      setUsers(res.data)
      const orderList=res.data.flatMap((user)=>user.orders||[])
      setOrders(orderList)
   }catch(error){
    console.log(error)
  }
}
   fetch() 
},[])


  
  return (
    <div className='flex gap-5 '>
    
      
<div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total Users</h5>

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{users.length}</h5>

</div>
<div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total Products</h5>

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{products.length}</h5>

</div>
<div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total Orders</h5>

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{orders.length}</h5>

</div>


    </div>
  )
}
