import {useDispatch} from "react-redux";

import CartButton from '../Cart/CartButton';
import {showModal} from "../UI/uiSlice";

import classes from './MainHeader.module.css';

const MainHeader = (props) => {
    const dispatch = useDispatch();

    const openModalHandler = () => {
        dispatch(showModal());
    };

  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={openModalHandler}/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
