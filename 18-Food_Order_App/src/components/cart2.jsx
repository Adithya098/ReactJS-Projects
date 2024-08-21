import { useContext } from 'react';
import Modal from "../UI/CartModal.jsx";
import Button from '../UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { currencyFormatter } from "../utils/currencyFormatter";
import CartItem from "./CartItems.jsx";
import checkout from './Checkout.jsx';

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalPrice = cartCtx.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    function handleHideCart() {
        userProgressCtx.hideCart();
    }

    function handleCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart'?handleHideCart:null}>
            <h2>Your Cart</h2>
            <ul className="item">
                {cartCtx.items.map(item => (
                    <CartItem 
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onAdd={() => cartCtx.addItem(item)}
                        onRemove={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(totalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleHideCart}>Close</Button>
                {cartCtx.items.length>0 &&
                (<Button onClick={handleCheckout}>Go to checkout</Button>)}
            </p>
        </Modal>
    );
}
