import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    loading:false,
    order:[],
    totalProductsPurchased:null,
    totalRevenue:null,
    error:''
}
const baseUrl=process.env.REACT_APP_BASE_URL
export const fetchOrders=createAsyncThunk('order/fetchorders',async(_,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+'/orders/admin',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(res.data)
        return res.data

    }catch(error){
        console.log(error);
        return rejectWithValue(error)
        
    }
})
export const fetchOrdersByIdAdmin=createAsyncThunk('order/fetchordersbyidadmin',async(id,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+`/orders/admin/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(res.data)
        return res.data

    }catch(error){
        console.log(error);
        return rejectWithValue(error)
        
    }
})

export const fetchOrderById=createAsyncThunk('order/fetchorderbyid',async(_,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+'/orders',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(res.data)
        return res.data

    }catch(error){
        console.log(error);
        return rejectWithValue(error)
        
    }
})
export const fetchTotalProductsPurchased=createAsyncThunk('order/fetchtotalproductspurchased',async(_,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+'/orders/admin/total-products',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(res.data)
        return res.data

    }catch(error){
        console.log(error);
        return rejectWithValue(error)
        
    }
})
export const fetchTotalRevenue=createAsyncThunk('order/fetchtotalrevenue',async(_,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+'/orders/admin/revenue',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(res.data)
        return res.data

    }catch(error){
        console.log(error);
        return rejectWithValue(error)
        
    }
})

const orderSlice=createSlice({
    name:'order',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchOrders.pending,(state)=>{
            state.loading=true;
            state.order=[];
            state.error='';
        })
        .addCase(fetchOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.order=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchOrders.rejected,(state,action)=>{
            state.loading=false;
            state.order=[];
            state.error=action.error.message
        })
        .addCase(fetchOrderById.pending,(state)=>{
            state.loading=true;
            state.order=[];
            state.error='';
        })
        .addCase(fetchOrderById.fulfilled,(state,action)=>{
            state.loading=false;
            state.order=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchOrderById.rejected,(state,action)=>{
            state.loading=false;
            state.order=[];
            state.error=action.error.message
        })
        .addCase(fetchOrdersByIdAdmin.pending,(state)=>{
            state.loading=true;
            state.order=[];
            state.error='';
        })
        .addCase(fetchOrdersByIdAdmin.fulfilled,(state,action)=>{
            state.loading=false;
            state.order=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchOrdersByIdAdmin.rejected,(state,action)=>{
            state.loading=false;
            state.order=[];
            state.error=action.error.message
        })
        .addCase(fetchTotalProductsPurchased.pending,(state)=>{
            state.loading=true;
            state.totalProductsPurchased=null;
            state.error='';
        })
        .addCase(fetchTotalProductsPurchased.fulfilled,(state,action)=>{
            state.loading=false;
            state.totalProductsPurchased=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchTotalProductsPurchased.rejected,(state,action)=>{
            state.loading=false;
            state.totalProductsPurchased=null;
            state.error=action.error.message
        })
        .addCase(fetchTotalRevenue.pending,(state)=>{
            state.loading=true;
            state.totalRevenue=null;
            state.error='';
        })
        .addCase(fetchTotalRevenue.fulfilled,(state,action)=>{
            state.loading=false;
            state.totalRevenue=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchTotalRevenue.rejected,(state,action)=>{
            state.loading=false;
            state.totalRevenue=null;
            state.error=action.error.message
        })

    }
})
export default orderSlice.reducer