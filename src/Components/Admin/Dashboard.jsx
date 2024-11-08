import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../Redux/Slices/UserSlice'
import { fetchProducts } from '../../Redux/Slices/ProductSlice'
import { fetchTotalProductsPurchased, fetchTotalRevenue } from '../../Redux/Slices/OrderSlice'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.user)
  const { products } = useSelector(state => state.product)
  const { totalProductsPurchased } = useSelector(state => state.order)
  const { totalRevenue } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchProducts())
    dispatch(fetchTotalProductsPurchased())
    dispatch(fetchTotalRevenue())
  }, [dispatch])

  return (
    <div className='grid gap-5 grid-cols-2 md:grid-cols-4 '>

      <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">Total Users</h5>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{users?.result?.length || 0}</h5>

      </div>
      <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">Total Products</h5>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{products?.result?.length || 0}</h5>

      </div>
      <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">Total Orders</h5>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{totalProductsPurchased}</h5>

      </div>
      <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">Total Revenue</h5>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{totalRevenue}</h5>

      </div>
    </div>
  )
}
