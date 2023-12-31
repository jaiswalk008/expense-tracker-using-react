import './Expense.css';
import ExpenseCard from './ExpenseCard';   
import { useSelector, useDispatch } from 'react-redux'; 
import { authActions } from '../Context/store';
const ExpenseList = (props) => {
    const dispatch = useDispatch();
    const {premium} = useSelector(state => state.auth);
    const {total} = useSelector(state => state.expense)
    
    const premiumHandler = () =>{
        dispatch(authActions.setPremium());
    }
    return(
        <div className="container mb-2">
            <div className='d-flex'>
                <div className='w-50'>
                    <h1 className="text-left">My Expenses</h1>  
                    <h5 className='text-secondary '>Total Expenses - {props.total}</h5>
                </div>
                {console.log(premium , total)}
                {(!premium) && (total>=10000  && <div className='mt-2 w-50'><button onClick={premiumHandler} className='btn float-end btn-danger'>Activate Premium</button></div>)}
            </div>
            <div className="expenses-container">
                {props.expenseList.map((expense) =>{
                    return <ExpenseCard key={expense.id} id={expense.id} amount={expense.amount}
                    category={expense.category} expenseName= {expense.expenseName} description={expense.description} />
                })}
                

            </div>
        </div>
    )
}
export default ExpenseList;