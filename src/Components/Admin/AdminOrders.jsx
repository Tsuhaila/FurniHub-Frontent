
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../Redux/Slices/OrderSlice'

export const AdminOrders = () => {
  const { order } = useSelector(state => state.order)
  console.log(order);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])
  if (order.length === 0) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="relative overflow-x-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Orders</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Id</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Ordered by</th>
            </tr>
          </thead>
          <tbody>
            {order.map(order => (
              order.orderDetails.map((item, index) => (
                <tr key={`${order.id}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.id}
                  </th>
                  <td className="px-6 py-4">{item.productName}</td>
                  <td className="px-6 py-4">
                    <img src={item.image} alt={item.productName} className="w-20 h-20 object-cover" />
                  </td>
                  <td className="px-6 py-4">{item.totalPrice}</td>
                  <td className="px-6 py-4">{order.customerName}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
