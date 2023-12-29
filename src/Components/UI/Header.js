import '../Expense/Expense.css';
import { useDispatch , useSelector} from 'react-redux';
import { themeActions } from '../Context/store';
import generateCSV from '../Expense/generateCSV';
const Header = (props) =>{
    const dispatch = useDispatch();
    const {mode} = useSelector(state => state.theme);
    const {premium} = useSelector(state => state.auth);
    const {expenseList} = useSelector(state=> state.expense);
    const changeThemeMode = () =>{
        dispatch(themeActions.toggleTheme());
    }
    const downloadExpenses= () =>{
      
        // console.log(expenseList)
        generateCSV(expenseList);
    }
    return (
        <nav className="navbar">
            <main>Welcome to Expense Tracker</main>
            <div>
            {premium &&  <button className='btn me-3' onClick={changeThemeMode}>{mode==='light' ? '☀️' : '🌑'}</button>}
            {premium &&  <button className='btn btn-primary me-3' onClick={downloadExpenses}>Download Expense Report</button>}
            {/*<span>Your profile is Incomplete <span onClick={completeProfileHandler} id="complete">Complete now</span></span> */}
            <button className='btn logout'  onClick={props.logoutHandler}>Logout</button>
            </div>
            
        </nav>
    );
}
export default Header;