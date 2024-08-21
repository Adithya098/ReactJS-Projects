import Header from "./components/Header";
import Meals from "./components/Meals";
import {CartContextProvider} from "./store/CartContext.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Cart from "./components/cart2.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
      <Header/>
      <Meals/>
      <Cart/>
      <Checkout />
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
