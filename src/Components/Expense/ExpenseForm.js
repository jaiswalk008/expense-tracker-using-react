import { useState } from 'react';
import Input from '../UI/Input';

const ExpenseForm = ({onAddExpenseHandler}) =>{
    const [expenseName,setExpenseName] = useState('');
    const [description , setDescription] = useState('');
    const [amount , setAmount]= useState();
    const [category , setCategory] = useState('Food');

    const amountChangeHandler = (e) => setAmount(e.target.value);
    const nameChangeHandler= (e) => {setExpenseName(e.target.value)}
    const descriptionChangeHandler = (e) => {setDescription(e.target.value)}
    const categoryChangeHandler = (e) => {setCategory(e.target.value)}
    
    const expenseFormHandler = (e) =>{
        e.preventDefault();
        const expenseDetails={
            expenseName:expenseName,
            amount:amount,
            description:description,
            category:category,
        }
        onAddExpenseHandler(expenseDetails);
        console.log(expenseDetails);
    }
    return (
        <div className='d-flex justify-content-center'>

            <div className='expense-container'>
                
            <form onSubmit={expenseFormHandler}>
            <div className='d-flex justify-content-center'><Input id="amount"  placeholder="0" label="" type="text" value={amount} onChange={amountChangeHandler} /></div>
            <Input id="expenseName" label="Name" type="text" value={expenseName} onChange={nameChangeHandler} />
            <Input id="description" label="Description" type="text" value={description} onChange={descriptionChangeHandler} />
            <label className='form-label'>Category</label>
            <select value={category} onChange={categoryChangeHandler} className='form-select m-1'>
                <option value="Food">Food</option>
                <option value="Bills">Bills</option>
                <option value="Movie">Movie</option>
                <option value="Others">Others</option>

            </select>
            <button className='btn m-1 add-expense'>Add Expense</button>
            </form>
        </div>
        </div>
    )
}
export default ExpenseForm;