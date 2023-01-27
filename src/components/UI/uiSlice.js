import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalIsShown: false,
    notification: {status: 'idle', title: 'idle', message: 'idle'}
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showModal(state) {state.modalIsShown = true},
        closeModal(state) {state.modalIsShown = false},
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message}
        },
    }
})

export const {showModal, closeModal, showNotification} = uiSlice.actions;

export default uiSlice.reducer;