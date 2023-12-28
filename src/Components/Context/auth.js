import { createSlice } from "@reduxjs/toolkit";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const initalToken = localStorage.getItem('token');
const isPremium = localStorage.getItem('token');
const initialAuthState = {
    token:initalToken || '' ,
    premium:isPremium || false,
}
// const history = useHistory();
const authSlice = createSlice({
    name:'authentication',
    initialState : initialAuthState,
    reducers:{
        setToken(state,action){
            state.token = action.payload;
            localStorage.setItem('token',state.token);
            
        },
        logout(state){
            // history.push('/login');
            state.token='';
            state.premium=false;
            localStorage.setItem('token',state.token);
            localStorage.setItem('premium',state.premium);
           

        },
        setPremium(state){
            state.premium = true;
            localStorage.setItem('premium' , true);
        }
    }
})
export default authSlice;