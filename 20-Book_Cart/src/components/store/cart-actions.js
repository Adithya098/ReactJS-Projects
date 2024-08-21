import { Cartshow } from './ui-slice'; 
import {cartActions} from './cart-slice'


export const fetchCartData = () => {
    return async(dispatch) => {
        const fetchData = async () => {
        const response = await fetch('https://redux-shoppingcart-098-default-rtdb.firebaseio.com/cart.json');
        if(!response.ok) {
            throw new Error("Could not fetch cart data!");
        }
        const data = await response.json();
        return data;
        };
        try{
            const cartData=await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items||[],
                totalprice:cartData.totalprice,
                totalquantity:cartData.totalquantity

            }));
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            dispatch(
              Cartshow.showNotification({
                status: 'error',
                title: 'ERROR!',
                message: 'Sending cart data Failed!',
              })
            );
          }
    };
    };    