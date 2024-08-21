import { currencyFormatter } from "../utils/currencyFormatter"
import Button from '../UI/Button.jsx'
import { useContext } from "react"
import CartContext from "../store/CartContext.jsx"


export default function Mealitems({meal}){

    const cartCtx=useContext(CartContext)

    function addMealtoCart(){
        cartCtx.addItem(meal);

    }
    return(
        <li className='meal-item' key={meal.id}>
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <h3>{meal.name}</h3>
                <div>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={addMealtoCart}>Add to cart</Button>
                </p>
            </article>
        </li>
    )
}