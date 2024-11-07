import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice"
import cartReducer from "../Slices/CartSlice"
import userReducer from '../Slices/UserSlice'
import productReducer from '../Slices/ProductSlice'
import orderReducer from '../Slices/OrderSlice'
import categoryReducer from '../Slices/CategorySlice'
import wishlistReducer from '../Slices/WishlistSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
        user:userReducer,
        product:productReducer,
        order:orderReducer,
        category:categoryReducer,
        wishlist:wishlistReducer
    }
})
export default store