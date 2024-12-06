import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart.slice.js';
import authReducer from './auth/auth.slice.js';

// Try to load the cart from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : { list: [], total: 0 };
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState: {
    cart: loadCartFromLocalStorage(), // Initialize cart state with data from localStorage
  }
});

export default store;
