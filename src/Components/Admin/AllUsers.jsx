import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { blockUser, fetchUser } from '../../Redux/Slices/UserSlice'


export const AllUsers = () => {
  const { users } = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log("allusers", users);

  useEffect(() => {

    dispatch(fetchUser())

  }, [dispatch])
  

  return (
    <div>
      <div className="relative overflow-x-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">All Users</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="bg-white border-b text-black">

                <th scope="row" className="px-6 py-4 font-medium ">
                  {u.id}
                </th>
                <td className="px-6 py-4">
                  {u.userName}
                </td>
                <td className="px-6 py-4">
                  {u.email}
                </td>
                <td className="px-6 py-4">

                  <button
                    onClick={() => dispatch(blockUser(u.id))}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${u.isBlocked
                      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                      : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                      }`}
                  >
                    {u.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <Link to={`${u.id}`}>
                    <button className="px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                      See More
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
