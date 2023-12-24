import { useState , useContext, useEffect } from 'react';
import './Expense.css';
import Profile from './Profile';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContextProvider';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const Expense = () =>{
    const [showProfileComponent , setShowProfileComponent] = useState(false);
    const [expenseList , setExpenseList] = useState([]);
    const emailVerificationStatus = localStorage.getItem('emailVerified');
    // const token = localStorage.getItem('token');
    const [error , setError] = useState('');
    const [emailVerified , setEmailVerified] = useState(!!emailVerificationStatus);
    const authCtx = useContext(AuthContext);
    const completeProfileHandler = () =>{
        // console.log('hello');
        setShowProfileComponent(prevState => !prevState)
    }
    const verifyEmail =async () =>{
        try {
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+process.env.REACT_APP_AUTH_KEY,
        {requestType:'VERIFY_EMAIL',
    idToken:authCtx.token});
            setEmailVerified(true);
            localStorage.setItem('emailVerified',true);
        } catch (error) {
            setError(error.response.data.error.message);
        }
        
    }
    const fetchExpenseList = async ()=>{
        try {
            const res = await axios.get('https://expense-tracker-911b6-default-rtdb.firebaseio.com/expenses.json');
            
            const keys = (Object.keys(res.data))
            const expenses = Object.values(res.data).map((element ,index) => {
                // console.log(element)
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
    const addExpenseHandler= (expense) =>{
        const updatedExpenseList = [...expenseList,expense];
        setExpenseList(updatedExpenseList);
    }


    return (
        <div>
            <nav className="navbar">
                <main>Welcome to Expense Tracker</main>
                <div>
                <span>Your profile is Incomplete <span onClick={completeProfileHandler} id="complete">Complete now</span></span>
                <button className='btn logout'  onClick={authCtx.logout}>Logout</button>
                </div>
                
            </nav>
            <hr></hr>
            {showProfileComponent && <Profile clickHander={completeProfileHandler}/>}
           {!emailVerified && <div className='d-flex justify-content-center'>
                {error.length>0 && <main>{error}</main>}
                <p onClick={verifyEmail} id='verify-email'>Verify your email</p>
            </div>}
            <ExpenseForm onAddExpenseHandler={addExpenseHandler}/>
            <ExpenseList expenseList={expenseList}/>
        </div>
    )
}
export default Expense;