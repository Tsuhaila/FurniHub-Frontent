import axios from 'axios';
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const cartContext=createContext()

const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([])
const navigate = useNavigate()
    const FetchCart = async () => {
        try {
            const userId = localStorage.getItem("id")
            const res = await axios.get(`http://localhost:3000/users/${userId}`)
            const cartList = res.data.cart
            setCartItem(cartList)

        } catch (error) {
            toast.warn("something went wrong")
            console.log(error)

        }

    }
    const RemoveCart = async (item) => {
        try {
            const updatedCartItems = cartItem.filter(x => x.id !== item.id)
            setCartItem(updatedCartItems)
            const userId = localStorage.getItem("id")
            await axios.patch(`http://localhost:3000/users/${userId}`, { cart: updatedCartItems })
            toast.success("item removed from the cart")
        } catch (error) {
            toast.warn("failed to remove item from the cart")
            console.log(error)
        }



    }

    const AddToCart = async (item, quantity) => {

        const user = localStorage.getItem("id");
        if (user) {
            try {

                const itemExists = cartItem.find(CartItem => CartItem.id === item.id);
                if (itemExists) {
                    toast.warn("item is already in the cart")
                    navigate('/cart')
                } else {
                    const updatedCart = [...cartItem, { ...item, quantity, totalPrice: (item.price * quantity) }]
                    setCartItem(updatedCart)
                    await axios.patch(`http://localhost:3000/users/${user}`, { cart: updatedCart });
                    toast.success("item successfully added to cart");
                    navigate('/cart')
                }

            } catch (error) {
                toast.warn("Something went wrong");
                console.log(error);
            }
        } else {
            toast.warn("Please Login")
            navigate('/login')


        }

    };
    return (
        <cartContext.Provider value={{FetchCart,cartItem,AddToCart,RemoveCart}}>
            {children}
        </cartContext.Provider>
    )
}



export default CartProvider;