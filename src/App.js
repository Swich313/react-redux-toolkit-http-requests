import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Product/Products';
import Notification from "./components/UI/Notification/Notification";

import {sendCartData, fetchCartData} from './components/Cart/cartSlice';

let isInitial = true;

function App() {
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const modalIsShown = useSelector(state => state.ui.modalIsShown);

    console.log(cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData());
    }, []);

    useEffect(() => {
        if(isInitial){
            isInitial = false;
            return;
        }
        dispatch(sendCartData(cart));
    }, [cart, dispatch]);


  return (
      <>
          {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
          <Layout>
              {modalIsShown && <Cart />}
              <Products />
          </Layout>
      </>
  );
}

export default App;
