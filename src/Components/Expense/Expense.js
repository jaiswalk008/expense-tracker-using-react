import { useState } from 'react';
import './Expense.css';
import Profile from './Profile';
import axios from 'axios';

const Expense = () =>{
    const [showProfileComponent , setShowProfileComponent] = useState(false);
    const emailVerificationStatus = localStorage.getItem('emailVerified');
    const token = localStorage.getItem('token');
    const [error , setError] = useState('');
    const [emailVerified , setEmailVerified] = useState(!!emailVerificationStatus);
    const completeProfileHandler = () =>{
        // console.log('hello');
        setShowProfileComponent(prevState => !prevState)
    }
    const verifyEmail =async () =>{
        try {
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+process.env.REACT_APP_AUTH_KEY,
        {requestType:'VERIFY_EMAIL',
    idToken:token});
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
                <span>Your profile is Incomplete <span onClick={completeProfileHandler} id="complete">Complete now</span></span>
            </nav>
            <hr></hr>
            {showProfileComponent && <Profile clickHander={completeProfileHandler}/>}
           {!emailVerified && <div className='d-flex justify-content-center'>
                {error.length>0 && <main>{error}</main>}
                <p onClick={verifyEmail} id='verify-email'>Verify your email</p>
            </div>}
        </div>
    )
}
export default Expense;