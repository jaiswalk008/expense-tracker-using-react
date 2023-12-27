import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Context/auth';
import expenseSlice from "./expense";
export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense:expenseSlice.reducer,
    }
})
export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;
