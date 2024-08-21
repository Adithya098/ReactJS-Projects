// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './ui-slice';
import cartSlice from './cart-slice' // Import the default export from ui-slice

const store = configureStore({
  reducer: { ui: cartReducer, cart:cartSlice} // Assign the reducer to 'cart'
});

export default store;

