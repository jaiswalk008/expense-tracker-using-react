import { useState } from 'react';
import './Expense.css';
import Profile from './Profile';
const Expense = () =>{
    const [showProfileComponent , setShowProfileComponent] = useState(false);

    const completeProfileHandler = () =>{
        // console.log('hello');
        setShowProfileComponent(prevState => !prevState)
    }
    return (
        <div>
            <nav className="navbar">
                <main>Welcome to Expense Tracker</main>
                <span>Your profile is Incomplete <span onClick={completeProfileHandler} id="complete">Complete now</span></span>
            </nav>
            <hr></hr>
            {showProfileComponent && <Profile clickHander={completeProfileHandler}/>}
        </div>
    )
}
export default Expense;