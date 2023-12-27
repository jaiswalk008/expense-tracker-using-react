import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState ={
    expenseList:[],
    updateExpense:{}
}
const expenseSlice = createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        addExpense(state , action){
            state.expenseList.push(action.payload);
        },
        setExpenseList(state , action){
            state.expenseList=action.payload;
        },
        updateExpenseDetails(state, action) {
            state.updateExpense = state.expenseList.find(expense => expense.id === action.payload);
        },
        deleteExpense(state, action) {
            state.expenseList = state.expenseList.filter(expense => expense.id !== action.payload);
        },
        
    }
})
export default expenseSlice;