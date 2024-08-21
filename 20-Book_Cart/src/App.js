import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import {useEffect,Fragment} from 'react'
import { Cartshow } from './components/store/ui-slice'; 
import Notification from './components/UI/Notification'
import { fetchCartData } from './components/store/cart-actions';

let isInitial=true;

function App() {
  const isCart = useSelector((state) => state.ui.cartIsVisible);
  const cart=useSelector((state) => state.cart);
  const notification=useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData()); 
  }, [dispatch]);

  useEffect(() => {
    
    const saveCartData = async () => {
      
      if(isInitial) {
        isInitial=false;
        return;
      }

      dispatch(
        Cartshow.showNotification({
          status: 'pending',
          title: 'Sending ..',
          message: 'Sending cart data...',
        })
      );
  
      try {
        const response = await fetch('https://redux-shoppingcart-098-default-rtdb.firebaseio.com/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cart),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data saved successfully:', data);

        dispatch(
          Cartshow.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sending cart data is Successful!',
          })
        );
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
  
    saveCartData();
  }, [cart,dispatch]);
  

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
      {isCart&&<Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
