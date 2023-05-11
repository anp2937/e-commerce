import React from 'react';
import {useState} from 'react';
import Messages from './Messages';

const Register = () => {

  // retrieve user data as a json object
  var jsonObj = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : [];

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState();


  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if (pass === confirmPass) {
      jsonObj.push({email: email, pass: pass})
      // write user data to localstorage
      localStorage.setItem('userData', JSON.stringify(jsonObj));
      setMessage("success");
    }
    else {
      setMessage("danger");
    }
  }

  return (
    <>
      <div className="container px-0" style={{ marginTop: "120px" }}>
        <Messages message={message} />
        <h4>Register new Account</h4>
        <form className="mb-3 mt-3" onSubmit={handleSubmit}>
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" type="text" name="email" /> <br/>
          <label>Password </label>
          <input value={pass} onChange={(e)=>setPass(e.target.value)} className="form-control" type="text" name="pass" /> <br/>
          <label>Confirm Password </label>
          <input value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} className="form-control" type="text" name="confirmPass" /> <br/>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register;