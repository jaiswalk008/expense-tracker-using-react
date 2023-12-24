import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContextProvider } from './Components/Context/AuthContextProvider';
import { ExpenseContextProvider } from './Components/Context/ExpenseContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter><AuthContextProvider>
    <ExpenseContextProvider><App/>
    </ExpenseContextProvider></AuthContextProvider></BrowserRouter>
  </React.StrictMode>
);