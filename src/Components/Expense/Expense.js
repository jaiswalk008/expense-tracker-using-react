import { useState , useContext } from 'react';
import './Expense.css';
import Profile from './Profile';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContextProvider';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { ExpenseContext } from '../Context/ExpenseContextProvider';
const Expense = () =>{
    const [showProfileComponent , setShowProfileComponent] = useState(false);
    const emailVerificationStatus = localStorage.getItem('emailVerified');
    
    const [error , setError] = useState('');
    const [emailVerified , setEmailVerified] = useState(!!emailVerificationStatus);
    const authCtx = useContext(AuthContext);
    const expenseCtx = useContext(ExpenseContext);
    const completeProfileHandler = () =>{
        setShowProfileComponent(prevState => !prevState)
    }
    const verifyEmail =async () =>{
        try {
            await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+process.env.REACT_APP_AUTH_KEY,
        {requestType:'VERIFY_EMAIL',
    idToken:authCtx.token});
            setEmailVerified(true);
            localStorage.setItem('emailVerified',true);
        } catch (error) {
            setError(error.response.data.error.message);
        }
        
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
            <ExpenseForm/>
            <ExpenseList expenseList={expenseCtx.expenseList}/>
        </div>
    )
}
export default Expense;