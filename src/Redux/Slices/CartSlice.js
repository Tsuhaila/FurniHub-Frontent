import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState={
    loading:false,
    cart:[],
    error:''
}
const baseUrl=process.env.REACT_APP_BASE_URL
export const addToCart=createAsyncThunk('cart/addtocart',async(id,{dispatch,rejectWithValue})=>{
    try{
        const response=await axios.post(baseUrl+`/cart/items/${id}`,{},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch(fetchCart())
        
        console.log(localStorage.getItem("token"))
        
        console.log(response.data)
        toast.success(response.data.message)
        return response.data;
       
    }catch(error){
        console.log(error)
        toast.warn(error.response.data.message)
       return rejectWithValue(error.response.data.message)
    }
}) ;
export const fetchCart=createAsyncThunk('cart/fetchcart',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get(baseUrl+'/cart/items',{
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
export const removeCart=createAsyncThunk('cart/removecart',async(id,{dispatch,rejectWithValue})=>{
    try{
        console.log(id);
        
        const response=await axios.delete(baseUrl+`/cart/items/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(fetchCart())
        toast.success(response.data.message)
        console.log(response.data);
        
        return response.data

    }catch(error){
        console.log(error.response.data.message);
        toast.warn(error.response.data.message);
        return rejectWithValue(error.response.data.message)
        

    }
    
})

export const increaseQuantity=createAsyncThunk('cart/increasequantity',async(productId,{dispatch,rejectWithValue})=>{
    try{
        console.log(productId);
        
        const response=await axios.put(baseUrl+`/cart/items/${productId}/increase`,{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(fetchCart())
        console.log(response.data);
        
        return response.data

    }catch(error){
        console.log(error.response.data.message);
        toast.warn(error.response.data.message);
        return rejectWithValue(error.response.data.message)
        

    }
    
})

export const decreaseQuantity=createAsyncThunk('cart/decreasequantity',async(productId,{dispatch,rejectWithValue})=>{
    try{
        console.log(productId);
        
        const response=await axios.put(baseUrl+`/cart/items/${productId}/decrease`,{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(fetchCart())
        console.log(response.data);
        
        return response.data

    }catch(error){
        console.log(error.response.data.message);
        toast.warn(error.response.data.message);
        return rejectWithValue(error.response.data.message)
       
    }  
})

const cartSlice=createSlice({
    name:'cart',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.error=''
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            console.log(action.payload);
            
            state.error=''
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.loading=false;
            console.log(action.payload)
            state.error=action.payload
        })
        .addCase(fetchCart.pending,(state)=>{
            state.loading=true;
            state.error=''
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            console.log(action.payload);
            
            state.error=''
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.loading=false;
            console.log(action.payload)
            state.error=action.payload
        })
        .addCase(removeCart.pending,(state)=>{
            state.loading=true;
            state.error=''
        })
        .addCase(removeCart.fulfilled,(state,action)=>{
            state.loading=false;
         
            console.log(action.payload);
            
            state.error=''
        })
        .addCase(removeCart.rejected,(state,action)=>{
            state.loading=false;
            console.log(action.payload)
            state.error=action.payload
        })
        // .addCase(increaseQuantity.pending,(state)=>{
        //     state.loading=true;
        //     state.error=''
        // })
        // .addCase(increaseQuantity.fulfilled,(state,action)=>{
        //     state.loading=false;
        //     state.cart=action.payload
         
        //     console.log(action.payload);
            
        //     state.error=''
        // })
        // .addCase(increaseQuantity.rejected,(state,action)=>{
        //     state.loading=false;
        //     console.log(action.payload)
        //     state.error=action.payload
        // })
        // .addCase(decreaseQuantity.pending,(state)=>{
        //     state.loading=true;
        //     state.error=''
        // })
        // .addCase(decreaseQuantity.fulfilled,(state,action)=>{
        //     state.loading=false;
        //     state.cart=action.payload;
         
        //     console.log(action.payload);
            
        //     state.error=''
        // })
        // .addCase(decreaseQuantity.rejected,(state,action)=>{
        //     state.loading=false;
        //     console.log(action.payload)
        //     state.error=action.payload
        // })

    }
})
export default cartSlice.reducer