import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    loading:false,
    products:[],
    product:null,
    error:''
}
const baseUrl=process.env.REACT_APP_BASE_URL
export const fetchProducts=createAsyncThunk('product/fetchproducts',async(_,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+'/products')
        console.log(res.data)
        return res.data;

    }catch(error){
        console.log(error);
        return rejectWithValue(error)
        
    }
})
export const fetchProductById=createAsyncThunk('product/fetchproductbyid',async(id,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+`/products/${id}`)
        return res.data

    }catch(error){
        console.log(error)
        return rejectWithValue(error)
    }
})

export const fetchProductByCategory=createAsyncThunk('product/fetchproductbycategory',async(category,{rejectWithValue})=>{
    try{
        const res=await axios.get(baseUrl+`/products/category-name/${category}`)
        return res.data

    }catch(error){
        console.log(error)
        return rejectWithValue(error)
    }
})
export const deleteProduct=createAsyncThunk('product/delreproduct',async(id,{rejectWithValue,dispatch})=>{
    try{
        console.log('id',id);
        
        const res=await axios.delete(baseUrl+`/products/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(fetchProducts())
        dispatch(fetchProductById(id))
        console.log(res.data);
        
    }catch(error){
        console.log(error)
        return rejectWithValue(error)
    }
})
export const addProduct=createAsyncThunk('product/addproduct',async(inputvalue,{rejectWithValue})=>{
    try{
        console.log('after pass input',inputvalue);
        
        const res=await axios.post(baseUrl+`/products`,inputvalue,{
            headers:{
                "Content-Type":"multipart/form-data",
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

export const editProduct=createAsyncThunk('product/editproduct',async({id,inputvalue},{rejectWithValue,dispatch})=>{
    try{
        const res=await axios.put(baseUrl+`/products/${id}`,inputvalue,{
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(fetchProducts())
        dispatch(fetchProductById(id))
        console.log(res.data)
        return res.data

    }catch(error){
        console.log(error);
        return rejectWithValue(error)
        
    }
})
export const searchProducts=createAsyncThunk('product/searchproduct',async(query,{rejectWithValue,dispatch})=>{
    try{
        const res=await axios.get(baseUrl+`/products/search?search=${query}`)
        console.log(res.data);
        return res.data
        

    }catch(error){
        console.log(error);
        rejectWithValue(error)
        
    }

})
const productSlice=createSlice({
    name:'product',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
            state.products=[];
            state.error='';
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
            state.products=[];
            state.error=action.error.message
        })
        .addCase(fetchProductByCategory.pending,(state)=>{
            state.loading=true;
            state.products=[];
            state.error='';
        })
        .addCase(fetchProductByCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchProductByCategory.rejected,(state,action)=>{
            state.loading=false;
            state.products=[];
            state.error=action.error.message
        })
        .addCase(fetchProductById.pending,(state)=>{
            state.loading=true;
            state.product=null;
            state.error='';
        })
        .addCase(fetchProductById.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(fetchProductById.rejected,(state,action)=>{
            state.loading=false;
            state.product=null;
            state.error=action.error.message
        })
        .addCase(addProduct.pending,(state)=>{
            state.loading=true;
            state.product=null;
            state.error='';
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.loading=false;
            state.product=null;
            state.error=action.error.message
        })
        .addCase(searchProducts.pending,(state)=>{
            state.loading=true;
            state.products=[];
            state.error='';
        })
        .addCase(searchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
            console.log(action.payload);
            
            state.error='';
        })
        .addCase(searchProducts.rejected,(state,action)=>{
            state.loading=false;
            state.products=[];
            state.error=action.error.message
        })
        
    }
})
export default productSlice.reducer