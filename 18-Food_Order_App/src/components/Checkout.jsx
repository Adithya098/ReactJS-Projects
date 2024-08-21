import UserProgressContext from '../store/UserProgressContext.jsx';
import CartContext from '../store/CartContext.jsx';
import { useContext, useRef, useState } from 'react';
import Modal from "../UI/CartModal.jsx";
import Button from '../UI/Button.jsx';
import { currencyFormatter } from "../utils/currencyFormatter";
import Input from './Inputs.jsx'

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [postalcodeisInvalid, setPostalCodeisInvalid] = useState(false);
    const email = useRef();
    const postalcode = useRef();
    
    const totalPrice = cartCtx.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    function handleHideCheckout() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event){
        event.preventDefault();
        const enteredEmail = email.current.value;
        const enteredPostalCode=postalcode.current.value;

        const emailIsValid = enteredEmail.includes('@');
        const postalcodeisInvalid = enteredPostalCode.length !== 6;
    
        if (!emailIsValid) {
            setEmailIsInvalid(true);
            return; 
        }

        if(postalcodeisInvalid) {
            setPostalCodeisInvalid(true);
            return;
        }
        setEmailIsInvalid(false);
        setPostalCodeisInvalid(false);

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        //console.log(data);
        console.log({
            items: cartCtx.items,
            customer: data
        });

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              order: {
                items: cartCtx.items,
                customer: data
              }
            })
          });
          
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleHideCheckout}>
            <form onSubmit={handleSubmit} noValidate> 
                <h2>Your checkout</h2>
                <p>{`Total Amount: ${currencyFormatter.format(totalPrice)}`}</p>

                <Input label="Full Name" type="text" id="full-name" name="name" />
            <div className="control no-margin">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" ref={email} />
                <div className="control-error">{emailIsInvalid && <p>Enter a valid Email address!</p>}</div>
            </div>
            <Input label="Street" type="text" id="street" name="street" />
            <div className="control-row">
                    <div className="control no-margin">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input id="postal-code" type="number" name="postal-code" ref={postalcode}/>
                        <div className="control-error">{postalcodeisInvalid && <p>Enter a valid postal address!</p>}</div>
                    </div>
                    <Input label="City" type="text" id="city"/>
                </div>

            
                

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleHideCheckout}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}
