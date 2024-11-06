import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const Dashboard = () => {

  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get('http://localhost:3000/products')
        setProducts(response.data)
        const res = await axios.get('http://localhost:3000/users')
        setUsers(res.data.filter((user) => user.admin !== true))
        const orderList = res.data.flatMap((user) => user.orders || [])
        setOrders(orderList)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])

  return (
    <div className='grid gap-5 grid-cols-2 md:grid-cols-3 '>


      <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">Total Users</h5>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{users.length}</h5>

      </div>
      <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">Total Products</h5>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{products.length}</h5>

      </div>
      <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">Total Orders</h5>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{orders.length}</h5>

      </div>
    </div>
  )
}
