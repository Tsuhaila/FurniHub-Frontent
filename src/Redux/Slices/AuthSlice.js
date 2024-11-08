import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl=process.env.REACT_APP_BASE_URL
const initialState = {
    loading: false,
    user: null,
    error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseUrl+'/auth/login',loginData);
        console.log(response.data);
        toast.success(response.data)
        return response.data;    
       
    } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response.data);
        return rejectWithValue(error.message);
    }
});

export const signupUser = createAsyncThunk('auth/signupUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseUrl+"/auth/register", userData);
        console.log(response.data)
        toast.success(response.data)
        return response.data;
        
        
    } catch (error) {
        toast.error(error.response.data)
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                if(action && action.payload && action.payload.result) {
                    localStorage.setItem("token",action.payload.result.token)
                    localStorage.setItem("id", action.payload.result.id);
                    localStorage.setItem("name", action.payload.result.name);
                    localStorage.setItem("role", action.payload.result.role);
                    console.log('user',state.user);
                    
                    toast.success("Successfully logged in");
                }
           
                state.error = null; 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;
