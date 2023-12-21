import { useState } from 'react';
import Input from '../UI/Input';
import axios from 'axios';
import './user.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Signup = () =>{
        const [email , setEmail] = useState('');
        const [password , setPassword] = useState('');
        const [confirmPassword , setConfirmPassword] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
        const emailChangeHandler = (e) =>{
            setEmail(e.target.value);
        }
        const passwordChangeHandler = (e) => {setPassword (e.target.value)}
    const confirmPasswordChangeHandler = (e) => {setConfirmPassword (e.target.value)}

    const signupHandler = async (e) =>{
        e.preventDefault();
        const userDetails ={
            email:email,
            password:password,
        }
        if(password.trim()!==confirmPassword.trim()) setErrorMessage('Passwords do not match')
        else{
            try {
                const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+process.env.REACT_APP_AUTH_KEY,
            userDetails);
                // console.log(res.data);
                setErrorMessage('');
            } catch (error) {
                console.log(error);
                setErrorMessage(error.response.data.error.message);
            }
        }
        

    }
    return (
        <div className='form-container'>
            <div>
                <h2>SignUp</h2>
                <form onSubmit={signupHandler}>
                    <Input id="email" label="Email" type="email" value={email} onChange={emailChangeHandler} />
                    <Input id="password" label="Password" type="password" value={password} onChange={passwordChangeHandler} />
                    <Input id="confirmPassword" label="Confirm password" type="password" value={confirmPassword} onChange={confirmPasswordChangeHandler} />
                    <button className='btn w-100 mt-1 btn-primary'>Signup</button>
                </form>
                {errorMessage.length>0 && <p className='message-alert'>{errorMessage}</p>}
            </div>
            <p className='login'><Link to="/login">Have an account? Login</Link></p>
        </div>
    )
}
export default Signup;