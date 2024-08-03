
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isUser: false,
    user: null,
    error: [],
};

export const UserSlice = createSlice({
    name: "user-slice",
    initialState,
    reducers: {
        IsLoading: (state, action) => {
            state.isLoading = true;
        },
        SetUser: (state, action) => {
            state.user = action.payload;
            state.isUser = true;
            state.isLoading = false;
            state.error = null;
        },
        RemoveUser: (state, action) => {
           state.user = null;
           state.isUser = false;
        },
        adderrors: (state, action) => {
            state.error.push(action.payload);
        },
        removeErrors: (state, action) => {
            state.error = [];
        },
    },
});

export const { SetUser, RemoveUser,addErrors, removeErrors } = UserSlice.actions;

export default UserSlice.reducer;
