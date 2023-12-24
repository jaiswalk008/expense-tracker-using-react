import './Expense.css'
const ExpenseCard = (props) =>{
    return (
        <div className="expense-card">
            <nav className='navbar '>{props.category}</nav>
                <div className='d-flex m-2'>
                    <div className='me-2'>
                        <h4>{props.expenseName}</h4>
                        <h6 className='text-secondary'>{props.description}</h6>

                    </div>
                    <div>
                        <strong  className='m-2 amount'>Rs. {props.amount}</strong>
                    </div>
                    </div>
                    <div className='float-end m-2'>
                        <button className='btn btn-danger me-1'>edit</button>
                        <button className='btn-dark btn'>delete</button>
                    </div>
                </div>
    )
}
export default ExpenseCard;