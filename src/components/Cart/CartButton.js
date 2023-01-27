import {useSelector} from "react-redux";

import classes from './CartButton.module.css';

const CartButton = (props) => {
    const totalAmountOfProducts = useSelector(state => state.cart.totalProductsInCart)
  return (
    <button onClick={props.onClick} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalAmountOfProducts}</span>
    </button>
  );
};

export default CartButton;
