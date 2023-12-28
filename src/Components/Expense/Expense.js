import { useState  } from 'react';
import './Expense.css';
import Profile from './Profile';
import axios from 'axios';
// import { AuthContext } from '../Context/AuthContextProvider';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
// import { ExpenseContext } from '../Context/ExpenseContextProvider';
import { useDispatch , useSelector } from 'react-redux';
import { authActions, themeActions } from '../Context/store';
// import { themeActions } from '../Context/store';
import Header from '../UI/Header';
// import { expenseActions } from '../Context/store';
const Expense = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [showProfileComponent , setShowProfileComponent] = useState(false);
    const emailVerificationStatus = localStorage.getItem('emailVerified');
    
    const [error , setError] = useState('');
    const [emailVerified , setEmailVerified] = useState(!!emailVerificationStatus);
    // const authCtx = useContext(AuthContext);
    // const expenseCtx = useContext(ExpenseContext);

    const {expenseList , total} = useSelector((state) => state.expense);
    const completeProfileHandler = () =>{
        setShowProfileComponent(prevState => !prevState)
    }
    const verifyEmail =async () =>{
        try {
            await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+process.env.REACT_APP_AUTH_KEY,
        {requestType:'VERIFY_EMAIL',
    idToken:localStorage.getItem('token')});
            setEmailVerified(true);
            localStorage.setItem('emailVerified',true);
        } catch (error) {
            setError(error.response.data.error.message);
        }
        
    }
   
    const logoutHandler = () =>{
        dispatch(themeActions.toggleTheme());
        dispatch(authActions.logout());
        history.push('/login');
    }

    return (
        <div>
            
            <Header logoutHandler = {logoutHandler}/>
            <hr></hr>
            {showProfileComponent && <Profile clickHander={completeProfileHandler}/>}
           {!emailVerified && <div className='d-flex justify-content-center'>
                {error.length>0 && <main>{error}</main>}
                <p onClick={verifyEmail} id='verify-email'>Verify your email</p>
            </div>}
            <ExpenseForm/>
            <ExpenseList total={total} expenseList={expenseList}/>
        </div>
    )
}
export default Expense;