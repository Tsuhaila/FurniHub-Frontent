import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState={
    loading:false,
    wishlist:[],
    message:null,
    error:''
}
const baseUrl=process.env.REACT_APP_BASE_URL
export const toggleWishlist=createAsyncThunk('wishlist/togglewishlist',async(productId,{dispatch,rejectWithValue})=>{
    try{
        const response=await axios.post(baseUrl+`/wishlist/items?productId=${productId}`,{},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch(fetchWishlist())
        
        console.log(localStorage.getItem("token"))
        
        console.log(response.data)
        toast.success(response.data)
        return response.data;
       
    }catch(error){
        console.log(error)
        toast.warn(error.response.data.message)
       return rejectWithValue(error.response.data.message)
    }
}) ;
export const fetchWishlist=createAsyncThunk('wishlist/fetchwishlist',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get(baseUrl+'/wishlist',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(response.data)
        return response.data

    }catch(error){
        console.log(error)
        toast.warn(error.response.data.message)
       return rejectWithValue(error.response.data.message)
    }
    
})


const wishlistSlice=createSlice({
    name:'wishlist',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(toggleWishlist.pending,(state)=>{
            state.loading=true;
            state.error=''
        })
        .addCase(toggleWishlist.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload;
            console.log(action.payload);
            
            state.error=''
        })
        .addCase(toggleWishlist.rejected,(state,action)=>{
            state.loading=false;
            console.log(action.payload)
            state.error=action.payload
        })
        .addCase(fetchWishlist.pending,(state)=>{
            state.loading=true;
            state.error=''
        })
        .addCase(fetchWishlist.fulfilled,(state,action)=>{
            state.loading=false;
            state.wishlist=action.payload;
            console.log(action.payload);
            
            state.error=''
        })
        .addCase(fetchWishlist.rejected,(state,action)=>{
            state.loading=false;
            console.log(action.payload)
            state.error=action.payload
        })

    }
})
export default wishlistSlice.reducer