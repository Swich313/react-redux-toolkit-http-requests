import {createSlice} from "@reduxjs/toolkit";
import {showNotification} from "../../UI/uiSlice";

const initialState = {
    products: [
        // {id: 'p1', title: 'Test', price: 6, description: 'This is a first Product - amazing!'},
        // {id: 'p2', title: 'Test1', price: 9.99, description: 'This is a second Product - amazing!'},
        // {id: 'p3', title: 'Test2', price: 8.78, description: 'This is a third Product - amazing!'},
    ],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProducts(state, action){
            state.products.push(action.payload);
        }
    }
});

export const loadProducts = () => {
    return async (dispatch) => {
        dispatch(showNotification({
            status: 'pending',
            title: 'Loading...',
            message: 'Loading products!'
        }));

        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_FIREBASE_PRODUCTS);
            if(!response.ok){
                throw new Error('Loading products failed!')
            }
            const data = await response.json()
            return data;
        };

        const transformData = arr => {
            // const transformedArray = arr.map(item => {
            //     return {id: item, title: item.title, price: item.price, description: item.description}
            // });
            // return transformedArray;
            let transformedArray = [];
            for (const key in arr) {
                transformedArray.push({id: key, title: arr[key].title, price: arr[key].price, description: arr[key].description})
            }
            return transformedArray;
        };

        try {
            const response = await sendRequest();
            const transformedProducts = transformData(response);
            dispatch(productSlice.actions.addProducts(transformedProducts));
            dispatch(showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Loaded products successfully!'
            }));
            return transformedProducts;
        } catch (err) {
            dispatch(showNotification({
                status: 'error',
                title: 'Error!',
                message: err.message
            }));
        }

    }
};

export const {addProducts} = productSlice.actions;

export default productSlice.reducer;