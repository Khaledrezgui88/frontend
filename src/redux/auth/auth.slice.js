import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';

const initialState = {
    user: null,
    auth: false,
    errors: [],
    loading: false,
    isAdmin: false
};

// Register user
export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:4000/auth/register', data);
        return response.data;  // Assurez-vous que la réponse contient les bons champs
    } catch (error) {
        return rejectWithValue(error.response?.data?.errors || 'An error occurred');
    }
});

// Login user
export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:4000/auth/login', data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.errors || 'An error occurred');
    }
});

// Logout user
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:4000/auth/logout');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.errors || 'An error occurred');
    }
});

// Get current user
export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const decoded = jwtDecode(token);
            console.log("decoded",decoded)

            if (!decoded?.id) {
                throw new Error('Invalid token');
            }
            const response = await axios.get(`http://localhost:4000/users/${decoded.id}`);

            return response.data.payload;
        } catch (error) {
            return rejectWithValue(error.message || 'An unexpected error occurred');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.auth = false;
            state.isAdmin = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.user = payload.payload.user;
                state.auth = true;
                state.isAdmin = payload.isAdmin || false;
                state.loading = false;
                localStorage.setItem('token', payload.token);
                toast.success("Registered successfully!");
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.errors = payload;
                state.loading = false;
                toast.error(payload || "Registration failed!");
            })

            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.user = payload.payload.user;
                state.auth = true;
                state.isAdmin = payload.isAdmin;
                state.loading = false;
                localStorage.setItem('token', payload.token);
                toast.success("Login successful!");
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.errors = payload;
                state.loading = false;
                toast.error(payload || "Login failed!");
            })

            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.auth = false;
                state.isAdmin = false;
                state.loading = false;
                localStorage.removeItem('token');
                toast.success("Logout successful!");
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.errors = payload;
                state.loading = false;
                toast.error(payload || "Logout failed!");
            })

            // Get Current User
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.auth = true;
                state.loading = false;
            })
            .addCase(getCurrentUser.rejected, (state, { payload }) => {
                state.errors = payload;
                state.loading = false;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
