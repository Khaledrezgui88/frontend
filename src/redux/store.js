import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./examples/example.slice";
import authReducer from "./auth/auth.slice.js";

export const store = configureStore({
    reducer: {
        example: exampleReducer,
        auth: authReducer
    },
})

export default store;
