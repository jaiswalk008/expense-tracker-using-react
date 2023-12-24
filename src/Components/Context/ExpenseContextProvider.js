import React, { useState ,useEffect } from "react";
import axios from "axios";
export const ExpenseContext= React.createContext({
    expenseList:[],
    addExpense:(expense) =>{},
    updateExpense:(id) =>{},
    getExpenseForUpdating:{},
    deleteExpense:(id) =>{}
})
export const ExpenseContextProvider = (props) =>{
    const [expenseList, setExpenseList] = useState([]);
    const [updateExpense , setUpdateExpense] = useState({});
    const fetchExpenseList = async ()=>{
        try {
            const res = await axios.get('https://expense-tracker-911b6-default-rtdb.firebaseio.com/expenses.json');
            
            const keys = (Object.keys(res.data))
            const expenses = Object.values(res.data).map((element ,index) => {
                
                const expenseDetails ={
                    id:keys[index],
                    expenseName:element.expenseName,
                    amount:element.amount,
                    description:element.description,
                    category:element.category,
                }
                return expenseDetails;
            })
            setExpenseList(expenses);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() =>{
        fetchExpenseList();
    },[])
    const addExpenseHandler = (expense) =>{
        const updatedExpenseList = [...expenseList,expense];
        setExpenseList(updatedExpenseList);
    }
    const updateExpenseDetails = (id) =>{
        const expenseDetails = expenseList.filter((expense) => expense.id===id)[0];
        console.log(expenseDetails);
        setUpdateExpense(expenseDetails);
        
    }
    const deleteExpenseHandler = (id) =>{
        const updatedExpenseList = expenseList.filter((expense) => expense.id!==id);
        // console.log(updatedExpenseList);
        // console.log('deleted expense')
        setExpenseList(updatedExpenseList);
    }
    const updateExpenseHandler = (id) => updateExpenseDetails(id);
    const expenseCtx = {
        expenseList:expenseList,
        addExpense:addExpenseHandler,
        updateExpense:updateExpenseHandler,
        getExpenseForUpdating:updateExpense,
        deleteExpense:deleteExpenseHandler
    }
    return <ExpenseContext.Provider value={expenseCtx}>{props.children}</ExpenseContext.Provider>
}
