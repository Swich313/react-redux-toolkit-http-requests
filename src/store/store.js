import {configureStore} from "@reduxjs/toolkit";
import productSlice from "../components/Shop/Product/productSlice";
import cartSlice from "../components/Cart/cartSlice";
import uiSlice from "../components/UI/uiSlice";

const store = configureStore({
    reducer: {products: productSlice, cart: cartSlice, ui: uiSlice}
});

export default store;