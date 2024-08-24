import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export const AllUsers = () => {

  const[users,setUsers]=useState([])
  
  useEffect(()=>{
   async function fetchUsers(){
    try{
      const res=await axios.get('http://localhost:3000/users')
      setUsers(res.data.filter((data)=>data.admin!==true))

    }catch(error){
      console.log(error)
    }

   }
   fetchUsers()
      

    

  },[])

  const handleBlock = async (userId,currentStatus) => {
    try{
      const newStatus= !currentStatus
   
    await axios.patch(`http://localhost:3000/users/${userId}`, {is_blocked:newStatus })
    setUsers(users.map(user=>
      user.id===userId?{...user,is_blocked:newStatus}:user

    ))

    }catch(error){
      console.log(error)
    }
    
   
  }
  return (
    <div>
      

<div class="relative overflow-x-auto">
<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">All Users</h2>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>    
               <th scope="col" class="px-6 py-3">
                 Action
               </th>
            </tr>
        </thead>
        <tbody>
         

         
          {users.map(item=>(
             <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              
             <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {item.id}
             </th>
             <td class="px-6 py-4">
             {item.username}
             </td>
             <td class="px-6 py-4">
                {item.email}
             </td>
             <td className="px-6 py-4">
            
                                    <button
                                        onClick={() => handleBlock(item.id, item.is_blocked)}
                                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                            item.is_blocked
                                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                        }`}
                                    >
                                        {item.is_blocked ? 'Unblock' : 'Block'}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`${item.id}`}>
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
