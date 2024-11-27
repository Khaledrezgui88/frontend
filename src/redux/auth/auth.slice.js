import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    auth: false,
    errors: [],
    loading: false
}

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:4000/auth/register', data)
        // TODO! Handle Token in localsotrage
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:4000/auth/login', data)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.auth = false;
            localStorage.removeItem('token')
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.auth = true
                state.loading = false
                localStorage.setItem('token', payload.token)
                toast.success("Register Successfully")
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.errors = payload
                state.loading = false
                payload.forEach(error => toast.error(error.msg));
            })
            .addCase(loginUser.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.user = payload.user; // à vérifier et configurer avec le backend
                state.auth = true
                state.loading = false
                localStorage.setItem('token', payload.token)
                toast.success("login Successfully")
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.errors = payload
                state.loading = false
                payload.forEach(error => toast.error(error.msg));
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer