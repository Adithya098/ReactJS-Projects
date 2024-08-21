import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';


const Cart = (props) => {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalprice)
  const quantity = useSelector((state) => state.cart.totalquantity);
  console.log(items,total,quantity);
  return (
    <Card className={classes.cart}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Your Cart</h2>
        <h2 style={{color:'red'}}>Total : ${total}</h2>
      </div>
      <ul>
      {items.map((product) => (
      <CartItem 
        key={product.id}  // Add the key prop here
        item={{ 
          id: product.id,
          title: product.name, 
          quantity: product.quantity, 
          total: product.totalPrice, 
          price: product.price 
        }}
      />
))}

      </ul>
    </Card>
  );
};

export default Cart;
