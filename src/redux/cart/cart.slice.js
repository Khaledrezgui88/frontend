import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { list: [], total: 0 },
    reducers: {
        addToCart(state, action) {
            const productIndex = state.list.findIndex(product => product._id === action.payload._id)
            if (productIndex !== -1) {
                // Increment quantity for existing product
                state.list[productIndex].quantity += action.payload.quantity || 1;

            } else {
                // Add new product with default quantity 1 if not specified
                state.list.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
            // Recalculate total
            state.total = state.list.reduce((sum, product) => sum + (product.price || 0) * (product.quantity || 1), 0);
              // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        updateQuantity(state, action) {
            const productIndex = state.list.findIndex(product => product._id === action.payload._id);
            if (productIndex !== -1) {
                // Update product quantity
                state.list[productIndex].quantity = action.payload.quantity || 1;
            }
            // Recalculate total
            state.total = state.list.reduce((sum, product) => sum + (product.price || 0) * (product.quantity || 1), 0);
          // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
        },
        removeItem(state, action) {
            // Remove product by ID
            if (!state.list) {
                state.list = [];
            }
            state.list = state.list.filter(product => product._id !== action.payload._id);
            // Recalculate total
            state.list = state.list.filter(product => product._id !== action.payload._id);
            state.total = state.list.reduce((sum, product) => sum + (product.price || 0) * (product.quantity || 1), 0);
 // Save to localStorage
 localStorage.setItem('cart', JSON.stringify(state));
        },
        checkStock(state, action) {
            const productIndex = state.list.findIndex(product => product._id === action.payload._id);
            if (productIndex !== -1) {
                const product = state.list[productIndex];
                if (product.quantity >= product.stock) {
                    console.warn("Stock limit reached for product:", product._id);
                    return;
                }
            }
        },
        clearCart(state) {
            state.list = [];
            state.total = 0;
            localStorage.removeItem('cart');

        },
        applyDiscount(state, action) {
            const { discountPercentage, productId } = action.payload;
            state.list = state.list.map(product => {
                if (!productId || product._id === productId) {
                    const discount = (product.price * discountPercentage) / 100;
                    return { ...product, price: Math.max(0, product.price - discount) };
                }
                return product;
            });
            state.total = state.list.reduce((sum, product) => sum + (product.price || 0) * (product.quantity || 1), 0);
        },
        calculateTax(state, action) {
            const taxRate = action.payload.taxRate || 0.2;
            const tax = state.total * taxRate;
            state.totalWithTax = state.total + tax;
        },
        getItemById(state, action) {
            const product = state.list.find(product => product._id === action.payload._id);
            return product || null;
        },
        checkMinimumTotal(state, action) {
            const minTotal = action.payload.minTotal || 50;
            if (state.total < minTotal) {
                console.warn(`Minimum total of ${minTotal} DT not reached.`);
                return false;
            }
            return true;
        },
        
        
    }
})

const { actions, reducer } = cartSlice

export const {
    addToCart,
    updateQuantity,
    removeItem,
    checkStock,
    clearCart,
    applyDiscount,
    calculateTax,
    getItemById,
    checkMinimumTotal
} = actions;

export default reducer