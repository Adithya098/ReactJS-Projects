//import { legacy_createStore } from 'redux';
import { createSlice,configureStore } from '@reduxjs/toolkit';

// Define the slice
const counterSlice = createSlice({
    name: 'counter',
    initialState: { counter: 0, showCounter: true },
    reducers: {
        increment(state, action) {
            state.counter += action.payload; 
        },
        decrement(state) {
            state.counter -= 1;
        },
        toggle(state) {
            state.showCounter = !state.showCounter; 
        }
    }
});

const initialAuthState = {
    isAuthenticated: false
};

const authSlice=createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers:{
        login(state){state.isAuthenticated = true},
        logout(state){state.isAuthenticated=false},
    }
});

/*
const counterReducer=(state={counter:0,showCounter:true},action) => {
    if (action.type=='increment'){
        return {counter:state.counter + action.amount,showCounter:true};
    }
    if (action.type=='decrement'){
        return {counter:state.counter-1,showCounter:true};
    }
    if(action.type==='toggle'){
        return {counter:state.counter,showCounter:!state.showCounter};
    }
    else{
        return state;
    }
}
*/

 
//const store = legacy_createStore(counterSlice.reducer);

const store = configureStore({
    reducer: {counter:counterSlice.reducer,auth:authSlice.reducer}
});


// Export the actions
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
 
export default store;
