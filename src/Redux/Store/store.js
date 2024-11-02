import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice"
import cartReducer from "../Slices/CartSlice"

const store=configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer
    }
})
export default store