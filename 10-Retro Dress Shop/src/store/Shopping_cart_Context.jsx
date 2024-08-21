import { createContext,useState,useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

export const CartContext = createContext ({
items:[],
//addItemToCart: ()=>{}
addItemtoCart: ()=>{},
updateItemQuantity: () =>{}
});

function shoppingCarReducer(state,action){
    
    if(action.type === "Add_Item"){
        {
            const updatedItems = [...state.items];
      
            const existingCartItemIndex = updatedItems.findIndex(
              (cartItem) => cartItem.id === action.payload
            );
            const existingCartItem = updatedItems[existingCartItemIndex];
      
            if (existingCartItem) {
              const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
              };
              updatedItems[existingCartItemIndex] = updatedItem;
            } else {
              const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
              updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
              });
            }
      
            return {
                ...state,
              items: updatedItems,
            };
          };
    }

    
    if(action.type === "Update_Item")
        {
            const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
              (item) => item.id === action.payload.productId
            );
      
            const updatedItem = {
              ...updatedItems[updatedItemIndex],
            };
      
            updatedItem.quantity += action.payload.amount;
      
            if (updatedItem.quantity <= 0) {
              updatedItems.splice(updatedItemIndex, 1);
            } else {
              updatedItems[updatedItemIndex] = updatedItem;
            }
      
            return {
                ...state,
              items: updatedItems,
            };
          }


    return state;
}

export default function CartContextProvider({children}){
    
    const [shoppingCartState, ShoppingCartDispatch] = useReducer(shoppingCarReducer,{
        items: [],
      });

      const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });
    
      function handleAddItemToCart(id) {
        ShoppingCartDispatch(
            {
                type:'Add_Item',
                payload:id
            }
        );
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {

        ShoppingCartDispatch(
            {
                type:'Update_Item',
                payload:{
                    productId,
                    amount
                }
            }
        )
      }
    
      const ctxValue={
        items:shoppingCartState.items,
        addItemtoCart:handleAddItemToCart,
        updateItemQuantity:handleUpdateCartItemQuantity,
      };

      return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
}