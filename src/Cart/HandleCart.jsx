// import axios from 'axios'
// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';


// export const HandleCart = async(item) => {
//     const navigate=useNavigate()
//     const user= localStorage.getItem("id");
//     if(user){
//         try{
//             const res=await axios.get(`http://localhost:3000/users/${user}`);
//             const currentCart=res.data.cart;
//             const itemExists=currentCart.find(cartItem=>cartItem.id===item.id);
//             if(itemExists){
//                 alert("item is already in the cart")
//             }else{
//                 const updatedCart=[...currentCart,item]
//                 await axios.patch(`http://localhost:3000/users/${user}`,{cart:updatedCart});
//                 alert("item successfully added to cart");
//             }

//         }catch(error){
//             alert("Something went wrong");
//             console.log(error);
//         }
//     }else{
//         toast.warn("Please Login")
//         navigate('/login')


//     }
  
// };
