import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exampleService from "./examples.service";

// Get user from localStorage
const user = localStorage.getItem("token");

const initialState = {
    user: user ? user : null,
    examples: [], // For storing all examples
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create example
export const createExample = createAsyncThunk(
    "example/create",
    async (example, thunkAPI) => {
        try {
            return await exampleService.create(example);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all examples
export const getAllExamples = createAsyncThunk(
    "example/getAll",
    async (_, thunkAPI) => {
        try {
            return await exampleService.getAll();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get example by ID
export const getExampleById = createAsyncThunk(
    "example/getById",
    async (id, thunkAPI) => {
        try {
            return await exampleService.getById(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update example
export const updateExample = createAsyncThunk(
    "example/update",
    async ({ id, example }, thunkAPI) => {
        try {
            return await exampleService.update(id, example);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete example
export const deleteExample = createAsyncThunk(
    "example/delete",
    async (id, thunkAPI) => {
        try {
            return await exampleService.remove(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const exampleSlice = createSlice({
    name: "example",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Create example
            .addCase(createExample.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createExample.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.examples.push(action.payload);
            })
            .addCase(createExample.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Get all examples
            .addCase(getAllExamples.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllExamples.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.examples = action.payload;
            })
            .addCase(getAllExamples.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Get example by ID
            .addCase(getExampleById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getExampleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload; // Replace with the specific field where you want to store this example
            })
            .addCase(getExampleById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Update example
            .addCase(updateExample.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateExample.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.examples = state.examples.map((example) =>
                    example.id === action.payload.id ? action.payload : example
                );
            })
            .addCase(updateExample.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Delete example
            .addCase(deleteExample.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteExample.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.examples = state.examples.filter(
                    (example) => example.id !== action.payload.id
                );
            })
            .addCase(deleteExample.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = exampleSlice.actions;
export default exampleSlice.reducer;
