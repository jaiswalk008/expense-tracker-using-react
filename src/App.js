
import './App.css'
import Expense from './Components/Expense/Expense';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import { Route , Redirect} from 'react-router-dom/cjs/react-router-dom.min';
function App() {
  

  return (
    <div className="App">
      <Route path="/" exact>
        <Redirect to="/login"></Redirect>
      </Route>
      <Route path="/signup"><Signup/></Route>
      <Route path="/login" exact><Login/></Route>
      <Route path="/expense"><Expense/></Route>
      
    </div>
  );
}

export default App;
