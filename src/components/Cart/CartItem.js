import {useDispatch} from "react-redux";

import {increaseProductAmount, decreaseProductAmount} from '../Cart/cartSlice';

import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();

  const increaseAmountHandler = () => {
      dispatch(increaseProductAmount({id}));
  };

    const decreaseAmountHandler = () => {
        dispatch(decreaseProductAmount({id}));
    };



    return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemPrice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseAmountHandler}>-</button>
          <button onClick={increaseAmountHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
