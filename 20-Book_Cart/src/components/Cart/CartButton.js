import classes from './CartButton.module.css';
import { useSelector } from 'react-redux';

const CartButton = (props) => {
  const quantity = useSelector((state) => state.cart.totalquantity);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
