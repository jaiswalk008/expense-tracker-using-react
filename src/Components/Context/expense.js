import { createSlice } from "@reduxjs/toolkit";
import { expenseActions } from "./store";
import axios from "axios";

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
        },
        resetExpenseState: (state) => {
            state.expenseList = [];
            state.total = 0;
        },
        
    }
})
export const fetchExpenseList = (email) =>{
    return async (dispatch) =>{
        const getExpenses =async () =>{
            const res = await axios.get(`https://expense-tracker-911b6-default-rtdb.firebaseio.com/${email}-expenses.json`);
            
            if(res.data){
                const keys = (Object.keys(res.data))
                dispatch(expenseActions.resetTotal());
                const expenses = Object.values(res.data).map((element ,index) => {
                    
                    const expenseDetails ={
                        id:keys[index],
                        expenseName:element.expenseName,
                        amount:element.amount,
                        description:element.description,
                        category:element.category,
                    }
                    
                    dispatch(expenseActions.addTotal(element.amount));
                    return expenseDetails;
                })
    
                dispatch(expenseActions.setExpenseList(expenses));
            }
        }
        try {
           await getExpenses();
 
        } catch (error) {
            console.log(error);
        }
    }
}
export default expenseSlice;