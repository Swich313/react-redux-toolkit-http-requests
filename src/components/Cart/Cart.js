import {useSelector} from "react-redux";

import Card from '../UI/Card/Card';
import CartItem from './CartItem';
import Modal from '../UI/Modal/Modal';

import classes from './Cart.module.css';

const Cart = (props) => {
    const productsInCart = useSelector(state => state.cart.products);

    const renderCartItems = arr => {
        return arr.map(item => {
            const totalPrice = item.price * item.amount;
            return <CartItem key={item.id}
                     item={{  id: item.id, title: item.title, quantity: item.amount, total: totalPrice, price: item.price }}
                />
        });
    };
  return (
      <Modal>
          <Card className={classes.cart}>
              <h2>Your Shopping Cart</h2>
              <ul>
                  {renderCartItems(productsInCart)}
              </ul>
          </Card>
      </Modal>
  );
};

export default Cart;
