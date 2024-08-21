import imglogo from '../assets/logo.jpg'
import Button from '../UI/Button.jsx'
import CartContext from "../store/CartContext.jsx"
import { useContext } from "react"
import UserProgressContext from '../store/UserProgressContext.jsx'

export default function Header(){
    
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext)
    
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
      }, 0);
      
    function handleShowCart(){
        userProgressCtx.showCart();
    }


    return (
        <div id='main-header'>
            <title id='title'>
                <img src={imglogo}/>
                <h1>React Food</h1>
            </title>
            <nav>
                <Button textOnly={true} onClick={handleShowCart}>Cart ({totalCartItems})</Button>

            </nav>
        </div>
    )
}