// MainHeader.js
import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';
import { useDispatch } from 'react-redux';
import { Cartshow } from '../store/ui-slice'; 

const MainHeader = () => {
  const dispatch = useDispatch();

  const CartHandler = () => {
    dispatch(Cartshow.cartchange());
  };

  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={CartHandler} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
