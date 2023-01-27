import ReactDOM from "react-dom";
import {useDispatch} from "react-redux";

import {closeModal} from '../uiSlice';

import styles from './Modal.module.css';

const BackDrop = props => {
    const dispatch = useDispatch();

    const closeModalHandler = () => {
        dispatch(closeModal());
    };

  return <div className={styles.backdrop} onClick={closeModalHandler}></div>
};

const ModalOverLay = props => {
    return (
        <div className={styles.modal}>{props.children}</div>
    )
};

const Modal = props => {
    const portalElement = document.getElementById('overlay');
    return (
        <>
            {ReactDOM.createPortal(<BackDrop />, portalElement)}
            {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, portalElement)}
        </>
    )
};

export default Modal;