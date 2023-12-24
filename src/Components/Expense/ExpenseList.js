import './Expense.css';
import ExpenseCard from './ExpenseCard';
const ExpenseList = (props) => {
    return(
        <div className="container mb-2">
            <h1 className="text-left">My Expenses</h1>
            <div className="expenses-container">
                {props.expenseList.map((expense) =>{
                    return <ExpenseCard key={Math.random()} amount={expense.amount}
                    category={expense.category} expenseName= {expense.expenseName} description={expense.description} />
                })}
                

            </div>
        </div>
    )
}
export default ExpenseList;