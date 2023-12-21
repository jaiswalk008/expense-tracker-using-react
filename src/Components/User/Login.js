import { useState, useContext } from 'react';
import './user.css';
import Input from '../UI/Input'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import {AuthContext} from '../Context/AuthContextProvider'

const Login = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const emailChangeHandler = (e) =>{
        setEmail(e.target.value);
    }
    const passwordChangeHandler = (e) => {setPassword (e.target.value)}
    const loginHandler = async (e) =>{
        e.preventDefault();
        const userDetails ={
            email:email,
            password:password,
        }
        try {
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.REACT_APP_AUTH_KEY,
        userDetails);
            // console.log(res.data);
            setErrorMessage('');
            authCtx.setToken(res.data.idToken);
            history.push('/expense');
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.error.message);
        }
    }
    return (
        <div className='form-container'>
        <div>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <Input id="email" label="Email" type="email" value={email} onChange={emailChangeHandler} />
                <Input id="password" label="Password" type="password" value={password} onChange={passwordChangeHandler} />
                
                <button className='btn w-100 mt-1 btn-primary'>Login</button>
            </form>
            {errorMessage.length>0 && <p className='message-alert'>{errorMessage}</p>}
        </div>
        <p className='signup'><Link to="/signup">Don't have an account? Signup</Link></p>
    </div>
    )
}
export default Login;