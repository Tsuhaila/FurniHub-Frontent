import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    users: [],       // For the list of all users
    user: null,      // For a single user's details
    error: ''
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchUser = createAsyncThunk('user/fetchuser', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(baseUrl + '/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const fetchUserById = createAsyncThunk('user/fetchuserbyid', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(baseUrl + `/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const blockUser = createAsyncThunk('user/blockuser', async (id, { rejectWithValue,dispatch }) => {
    try {
        const res = await axios.patch(baseUrl + `/users/${id}/block-unblock`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch(fetchUser())
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.users = [];
                state.error = '';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;  // Set list of users here
                state.error = '';
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.error = action.error.message;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = '';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;  // Set single user data here
                state.error = '';
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;
