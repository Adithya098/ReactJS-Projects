import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalquantity: 0,
    totalprice: 0
  },
  reducers: {
    replaceCart(state, action){
      state.items = action.payload.items;
      state.totalprice = action.payload.totalprice;
      state.totalquantity = action.payload.totalquantity;
      },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalquantity += 1;
      state.totalprice += newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id, 
          price: newItem.price, 
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalquantity -= 1;
      state.totalprice -= existingItem.price;
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    }
  }
});

// Export actions and reducer
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;  // Corrected this line
