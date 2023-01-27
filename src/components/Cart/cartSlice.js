import {createSlice} from "@reduxjs/toolkit";
import {showNotification} from "../UI/uiSlice";


const initialState = {
    products: [],
    totalProductsInCart: 0,
};

const cartSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        replaceCart(state, action){
            state.products = action.payload.products;
            state.totalProductsInCart = action.payload.totalProductsInCart;
        },
        addProductToCart(state, action) {
            const productAtCartIndex = state.products.findIndex(item => {
                return item.id === action.payload.id
            });
            if(productAtCartIndex === -1){
                const productToCart = {...action.payload, amount: 1};
                state.products.push(productToCart);
            } else {
                state.products[productAtCartIndex].amount += 1;
            }
            let totalAmount = 0;
            state.products.forEach(item => totalAmount += item.amount);
            state.totalProductsInCart = totalAmount;
        },
        increaseProductAmount(state, action) {
            const productAtCartIndex = state.products.findIndex(item => {
                return item.id === action.payload.id
            });
            state.products[productAtCartIndex].amount += 1;
            let totalAmount = 0;
            state.products.forEach(item => totalAmount += item.amount);
            state.totalProductsInCart = totalAmount;
        },
        decreaseProductAmount(state, action) {
            const productAtCartIndex = state.products.findIndex(item => {
                return item.id === action.payload.id
            });
            if(state.products[productAtCartIndex].amount === 1){
                state.products.splice(productAtCartIndex, 1);
                state.totalProductsInCart -= 1;
            } else {
                state.products[productAtCartIndex].amount -= 1;
                state.totalProductsInCart -= 1;
            }
        },

    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        console.log(cart);
        console.log()
        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_FIREBASE_CART, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(cart)
            });
            if(!response.ok){
                throw new Error('Sending cart data failed!')
            }
        }
        try {
            await sendRequest();
            dispatch(showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }));
        } catch (err) {
            dispatch(showNotification({
                status: 'error',
                title: 'Error!',
                message: err.message
            }));
        }

    }
};

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(showNotification({
            status: 'pending',
            title: 'Fetching...',
            message: 'Fetching cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_FIREBASE_CART);
            if(!response.ok){
                throw new Error('Fetching cart data failed!')
            }
            return await response.json();
        }
        try {
            const cartData = await sendRequest();
            console.log(cartData)
            dispatch(cartSlice.actions.replaceCart({products: cartData.products, totalProductsInCart: cartData.totalProductsInCart}));
            dispatch(showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Fetched cart data successfully!'
            }));
        } catch (err) {
            dispatch(showNotification({
                status: 'error',
                title: 'Error!',
                message: err.message
            }));
        }

    }
};

export const {
    addProductToCart,
    increaseProductAmount,
    decreaseProductAmount,
} = cartSlice.actions;

export default cartSlice.reducer;