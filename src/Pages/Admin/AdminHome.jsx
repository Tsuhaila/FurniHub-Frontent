import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
// import { MdDashboard } from "react-icons/md";
// import { FaUsers } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function Homes() {
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const role=localStorage.getItem('role')

  useEffect(()=>{
    if(role==='admin'){
      setIsAdmin(true)
    }
  },[])



  const Data = [
    { title: "Dashboard", url: "dashboard"},
    { title: "All Users", url: "allusers"    },
    { title: "Add Products", url: "addproducts"},
    { title: "All Products", url: "allproducts" },
    { title: "Orders", url: "Orders" },
  
  ];

  if (!isAdmin) {
    return <div>Unauthorized</div>; // Or redirect to an unauthorized page
  }



  const handleLogout=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        navigate('/login')
      }
    });
  
  }

  return (
    <>

    <CiMenuBurger className="mt-5 text-2xl" onClick={() => setIsOpen(true)}/>
      
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 w-full" onClick={() => setIsOpen(false)} >
      {/* Sidebar */}
      
      <div
        className={`fixed inset-0 bg-gray-700 text-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-[50%] md:w-72 h-full pt-20 z-10 md:translate-x-0`}
      >
        <div            className="block w-[80%] mx-auto">
       <p className="font-bold text-2xl hover:bg-gray-600 rounded-lg px-6 py-3 mb-4 transition-colors">Admin</p>
        {Data.map((item, ind) => (
          <Link
            key={ind}
            to={`${item.url}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="hover:bg-gray-600 rounded-lg px-6 py-3 mb-4 transition-colors">
              {item.title}
            </div>
            
          </Link>
          
        ))}
        
        
      <div className="hover:bg-gray-600 rounded-lg px-6 py-3 mb-4 transition-colors"onClick={handleLogout}>Logout</div>
      </div>
     
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-72 w-full p-6 pt-20">
        <Outlet /> 
      </div>
    </div>
    </>
  );
}

export default Homes;
