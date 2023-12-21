import { useState ,useContext} from "react"
import Input from "../UI/Input"
import './Expense.css'
import axios from "axios";
// import AuthContext from '../Context/AuthContextProvider';

const Profile = ({clickHander}) =>{
    const [name , setName] = useState('');
    const [url , setUrl] = useState('');
    // const authCtx = useContext(AuthContext);
    const nameChangeHandler = (e) => {setName(e.target.value)}
    const urlChangeHandler = (e) => {setUrl(e.target.value)}
    const updateProfile = async (e) =>{
        e.preventDefault();
        const profileDetails={
            idToken:localStorage.getItem('token'),
            displayName:name,
            photoUrl:url,
        }
       try {
        const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key='+process.env.REACT_APP_AUTH_KEY,
        profileDetails);
        console.log(res.data);
       } catch (error) {
            console.log(error);
       }

    }
    return (
        <div className="profile-container">
            <div className="w-100">
                <span>Contact Details</span>
                <button className="btn float-end btn-danger" onClick={clickHander}> Cancel</button>
            </div>
            <form onSubmit={updateProfile}>
                <Input id="name" label="Full Name:" type="text" value={name} onChange={nameChangeHandler} />
                <Input id="profile-photo" label="Profile Photo URL:" type="url" value={url} onChange={urlChangeHandler} />
                <button id="update" className="btn">Update</button>
            </form>
            <hr></hr>
        </div>
    )
}
export default Profile;