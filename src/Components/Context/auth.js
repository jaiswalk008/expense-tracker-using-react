import { createSlice } from "@reduxjs/toolkit";
const initalToken = localStorage.getItem('token');
const isPremium = localStorage.getItem('premium');
const initialAuthState = {
    token:initalToken || '' ,
    premium:isPremium || false,
}
console.log(initialAuthState)
const authSlice = createSlice({
    name:'authentication',
    initialState : initialAuthState,
    reducers:{
        setToken(state,action){
            state.token = action.payload;
            localStorage.setItem('token',state.token);
            
        },
        logout(state){
            state.token='';
            state.premium=false;
            localStorage.setItem('token',state.token);
            localStorage.setItem('premium',state.premium);
            localStorage.removeItem('email');

        },
        setPremium(state){
            state.premium = true;
            localStorage.setItem('premium' , true);
        }
    }
})
export default authSlice;