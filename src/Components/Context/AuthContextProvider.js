import React, { useState } from "react";

export const AuthContext = React.createContext({
    token:'',
    setToken:(token) =>{},
    logout:() =>{},
})

export const AuthContextProvider = (props) =>{
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const addToken = (token) => {
        localStorage.setItem('token',token);
        setToken(token);
    }
    const logoutHandler =() =>{
        console.log('logout');
    }
    const authCtx={
        token:token,
        setToken:addToken,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={authCtx}>{props.children}</AuthContext.Provider>
}