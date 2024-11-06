import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    loading:false,
    categories:[],
    error:''
}
const baseUrl=process.env.REACT_APP_BASE_URL
export const fetchCategories=createAsyncThunk('product/fetchcategories',async(_,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+'/categories')
        console.log(res.data)
        return res.data

    }catch(error){
        console.log(error);
        return rejectWithValue(error)
        
    }
})
const categorySlice=createSlice({
    name:'category',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.pending,(state)=>{
            state.loading=true;
            state.categories=[];
            state.error='';
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.loading=false;
            state.categories=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.loading=false;
            state.categories=[];
            state.error=action.error.message
        })

    }
})
export default categorySlice.reducer