import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if (existingCartItem.quantity > 1) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        }
        return { ...state, items: updatedItems };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;







/*
This is what the state might look like

const initialState = {
  items: [
    { id: 1, name: 'Apple', quantity: 2, price: 1.0 },
    { id: 2, name: 'Banana', quantity: 3, price: 0.5 },
]
}

const action = {
  type: 'ADD_ITEM',
  item: { id: 3, name: 'Orange', price: 0.8 },
};

------------------------------------------------------------------

1. const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
useReducer Hook: This hook is used for state management in React, especially when you have complex state logic. 
It takes a reducer function and an initial state as arguments and returns an array with two elements:

cart: The current state.
dispatchCartAction: A function to dispatch actions to the reducer.

cartReducer: This is the reducer function that handles the state updates based on the action types.
Initial State: { items: [] } is the initial state of the cart, which starts as an empty array.

2. function addItem(item) { dispatchCartAction({ type: 'ADD_ITEM', item }); }
addItem Function: This function is used to add an item to the cart.
Parameter: item is the item to be added to the cart.
dispatchCartAction: This function is called with an action object { type: 'ADD_ITEM', item }. 

The action object has two properties:
type: Specifies the action type, in this case, 'ADD_ITEM'.
item: The item to be added to the cart.

3. function removeItem(id) { dispatchCartAction({ type: 'REMOVE_ITEM', id }); }
removeItem Function: This function is used to remove an item from the cart.
Parameter: id is the identifier of the item to be removed from the cart.
dispatchCartAction: This function is called with an action object { type: 'REMOVE_ITEM', id }. 

The action object has two properties:
type: Specifies the action type, in this case, 'REMOVE_ITEM'.
id: The ID of the item to be removed from the cart.


4. const cartContext = { items: cart.items, addItem, removeItem };
cartContext Object: This object defines the context value that will be provided to the rest of the application.
items: This is cart.items, representing the current list of items in the cart.
addItem: This is the addItem function defined above, which allows adding items to the cart.
removeItem: This is the removeItem function defined above, which allows removing items from the cart.

*/