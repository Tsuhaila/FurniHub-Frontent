import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserById } from '../../Redux/Slices/UserSlice'
import {fetchOrdersByIdAdmin } from '../../Redux/Slices/OrderSlice'

export const UserDetails = () => {
  const { id } = useParams()
  const { user } = useSelector(state => state.user)
  const { order } = useSelector(state => state.order)
  console.log('order', order)
  console.log('user', user);

  const dispatch = useDispatch()
  useEffect(() => {

    try {
      dispatch(fetchUserById(id))
      dispatch(fetchOrdersByIdAdmin(id))

    } catch (error) {
      console.log(error)
    }

  }, [id, dispatch])
  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {user.userName}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Id: {user.id}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">Email: {user.email}</p>

        {order && order.length > 0 ? (
          <div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Address: {order[0].homeAddress}, {order[0].customerCity}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">Phone: {order[0].customerPhone}</p>
          </div>
        ) : (
          <p className="text-gray-500"></p>
        )}
      </div>

      <h4 className="text-lg font-semibold mt-4">Orders:</h4>
      {order && order.length > 0 ? (
        <div className="flex flex-col gap-4">
          {order.map((o) => (
            <div
              key={o.id}
              className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <p className="font-semibold text-gray-700 dark:text-gray-400">Order ID: {o.orderstring}</p>
              <p className="font-normal text-gray-700 dark:text-gray-400">Total Price: {o.totalAmount}</p>

              <h5 className="mt-4 font-semibold text-gray-700 dark:text-gray-400">Items:</h5>
              {o.orderDetails && o.orderDetails.length > 0 ? (
                o.orderDetails.map((item) => (
                  <div key={item.id} className="flex items-center mt-2">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-700 dark:text-gray-400">{item.productName}</p>
                      <p className="font-normal text-gray-700 dark:text-gray-400">Price: {item.totalPrice}</p>
                      <p className="font-normal text-gray-700 dark:text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in this order.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders placed.</p>
      )}
    </div>
  );

}
