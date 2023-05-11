import React, {useState, useContext} from 'react';
import Messages from './Messages';
import UserContext from './UserContext'

const MyAccount = () => {

  var jsonObj = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : [];
  // get curent userId
  var currentUserId = JSON.parse(sessionStorage.getItem("userId"));
  const [message, setMessage] = useState();
  //<UserContext.Provider value={[token, userIndex, setUserIndex, cart, setCart, productId, setProductId]} >
  const userToken = useContext(UserContext)[0];
  const userId = useContext(UserContext)[1];


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');



  const handleSubmit = (e) =>
  {
    e.preventDefault();

    if (userToken && firstName && lastName)
    {
      jsonObj[currentUserId].firstName = firstName;
      jsonObj[currentUserId].lastName = lastName;
      jsonObj[currentUserId].address = address;
      jsonObj[currentUserId].city = city;
      jsonObj[currentUserId].state = state;
      jsonObj[currentUserId].zip = zip;
      // debug json object
      console.log(JSON.stringify(jsonObj));

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
        <h1>My account</h1>
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input className="form-control" type="text" name="first" required onChange={(e)=>setFirstName(e.target.value)} /> <br/>
          <label>Last Name</label>
          <input className="form-control" type="text" name="last"  required onChange={(e)=>setLastName(e.target.value)} /> <br/>
          <label>Address</label>
          <input className="form-control" type="text" name="address"  onChange={(e)=>setAddress(e.target.value)} /> <br/>
          <label>City</label>
          <input className="form-control" type="text" name="city" onChange={(e)=>setCity(e.target.value)} /> <br/>
          <label>State</label>
          <input className="form-control" type="text" name="state" onChange={(e)=>setState(e.target.value)} /> <br/>
          <label>Zip</label>
          <input className="form-control" type="text" name="zip" onChange={(e)=>setZip(e.target.value)} /> <br/>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    </>
  )
}

export default MyAccount;