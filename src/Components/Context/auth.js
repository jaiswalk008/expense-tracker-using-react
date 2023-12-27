import { createSlice } from "@reduxjs/toolkit";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const initalToken = localStorage.getItem('token');
const initialAuthState = {
    token:initalToken || '' ,
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
            localStorage.setItem('token',state.token);
        }
    }
})
export default authSlice;