
import './App.css'
import Signup from './Components/User/Signup';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
function App() {
  

  return (
    <div className="App">
      <Route path="/signup"><Signup/></Route>
      
    </div>
  );
}

export default App;
