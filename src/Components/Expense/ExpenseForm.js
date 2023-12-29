import {  useEffect, useState } from 'react';
import Input from '../UI/Input';
import axios from 'axios';

import { useDispatch , useSelector } from 'react-redux';
import {expenseActions} from '../Context/store';
import { fetchExpenseList } from '../Context/expense';
const ExpenseForm = () =>{
    const [expenseName,setExpenseName] = useState('');
    const [description , setDescription] = useState('');
    const [amount , setAmount]= useState('');
    const [category , setCategory] = useState('Food');
    const [editExpense , setEditExpense] = useState(false);
    const [id, setId] = useState(null);

    const amountChangeHandler = (e) => setAmount(e.target.value);
    const nameChangeHandler= (e) => {setExpenseName(e.target.value)}
    const descriptionChangeHandler = (e) => {setDescription(e.target.value)}
    const categoryChangeHandler = (e) => {setCategory(e.target.value)}
    const dispatch = useDispatch();
    const {updateExpense } = useSelector(state => state.expense);
    const {formStyle} = useSelector(state => state.theme);
   
    useEffect(() =>{
     
        const expenseDetails = updateExpense;

        
        if( Object.keys(expenseDetails).length> 0){
 
            setId(expenseDetails.id);
      
            setAmount(expenseDetails.amount);
            setCategory(expenseDetails.category);
            setExpenseName(expenseDetails.expenseName);
            setDescription(expenseDetails.description);
            setEditExpense(true);
        }
        
    },[updateExpense])
    
    useEffect(() =>{
        dispatch(fetchExpenseList() );
    },[dispatch])
    const expenseFormHandler = async (e) =>{

        e.preventDefault();
        // console.log(id)
        const expenseDetails={
            expenseName:expenseName,
            amount:amount,
            description:description,
            category:category,
        }
        try {
           if(!editExpense){
            const res = await axios.post('https://expense-tracker-911b6-default-rtdb.firebaseio.com/expenses.json',expenseDetails);
        
            dispatch(expenseActions.addExpense({...expenseDetails,id:res.data.name}));
  
            dispatch(expenseActions.addTotal(expenseDetails.amount));
           }
           else{
          
            const res = await axios.put(`https://expense-tracker-911b6-default-rtdb.firebaseio.com/expenses/${id}.json`,expenseDetails);
          
            dispatch(expenseActions.addExpense({...expenseDetails,id:res.data}))
    
            dispatch(expenseActions.addTotal(expenseDetails.amount));
            setEditExpense(false);
           }
           
        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <div className='d-flex justify-content-center' >

            <div className='expense-container' style={formStyle}>
                
            <form onSubmit={expenseFormHandler}>
            <div className='d-flex justify-content-center'><Input id="amount" placeholder="0" label="" type="text" value={amount} onChange={amountChangeHandler} /></div>
            <Input id="expenseName" label="Name" type="text" value={expenseName} onChange={nameChangeHandler} />
            <Input id="description" label="Description" type="text" value={description} onChange={descriptionChangeHandler} />
            <label className='form-label'>Category</label>
            <select id='category' value={category} onChange={categoryChangeHandler} className='form-select m-1'>
                <option value="Food">Food</option>
                <option value="Bills">Bills</option>
                <option value="Movie">Movie</option>
                <option value="Others">Others</option>

            </select>
            <button className='btn m-1 add-expense'>{editExpense? 'Update Expense' : 'Add Expense'}</button>
            </form>
        </div>
        </div>
    )
}
export default ExpenseForm;