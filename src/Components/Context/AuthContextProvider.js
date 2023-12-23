import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export const AuthContext = React.createContext({
    token:'',
    setToken:(token) =>{},
    logout:() =>{},
})

export const AuthContextProvider = (props) =>{
    const initialToken = localStorage.getItem('token');
    const history = useHistory();
    const [token, setToken] = useState(initialToken);
    const addToken = (token) => {
        localStorage.setItem('token',token);
        setToken(token);
    }
    const logoutHandler =() =>{
        // console.log('logout');
        history.push('/login');
        setToken('');
        
    }
    const authCtx={
        token:token,
        setToken:addToken,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={authCtx}>{props.children}</AuthContext.Provider>
}