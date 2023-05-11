import React, {useState, useContext} from 'react';
import UserContext from './UserContext'
import Messages from './Messages'
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [userIndex, setUserIndex] = useState();
  const setUserId = useContext(UserContext)[2];


  const handleSubmit = (e) =>
  {
    e.preventDefault();
    var userData = JSON.parse(localStorage.userData);
    var userFound = null;
    if(email) {
      userFound = userData.find(element=>element.email === email);
      if (userFound && userFound.pass === pass) {
        // save current user Index and token to Session Storage
        sessionStorage.setItem('userId', JSON.stringify(userData.indexOf(userFound)));
        sessionStorage.setItem('usertkn', email);
        props.setToken(email);
        setMessage("success");
        setTimeout(() => {
          navigate("/");
        }, 1500)

      }
      else {
        setMessage("danger")
      }
    }
    else {
      setMessage("danger")
    }
    setTimeout(() => {
      setMessage(false);
    }, 2500)
  }

  return (
    <div className="container px-0" style={{ marginTop: "120px" }}>
      <Messages message={message} /><br/>
      <h4>Log In</h4>
      <form onSubmit={handleSubmit} className="mb-3 mt-3">
        <label>User </label>
        <input className="form-control" type="text" name="user" onChange={(e)=>setEmail(e.target.value)} /> <br/>
        <label>Password </label>
        <input className="form-control" type="text" name="pass" onChange={(e)=>setPass(e.target.value)} /> <br/>
        <button className="btn btn-primary" >Sign in</button>
      </form>
    </div>
  )
}

export default Login;