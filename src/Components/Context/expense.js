import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState ={
    expenseList:[],
    updateExpense:{},
    total:0,
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
            state.expenseList = state.expenseList.filter(expense =>{
                if( expense.id !== action.payload) return expense;
                else state.total = state.total-expense.amount;
            });
            
        },
        addTotal(state,action){
            // console.log('adding...')
            state.total = +state.total + + action.payload;
        },
        resetTotal(state){
            state.total=0;
        }
        
    }
})
export default expenseSlice;