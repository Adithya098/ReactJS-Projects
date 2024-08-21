// ui-slice.js
import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'ui',
  initialState: { cartIsVisible: false,notification:false },
  reducers: {
    cartchange(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = { 
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    }
  }
});

// Export the actions
export const Cartshow = CartSlice.actions;

// Export the reducer as the default export
export default CartSlice.reducer;


