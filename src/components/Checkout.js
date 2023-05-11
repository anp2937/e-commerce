import React, {useState, useContext, useEffect} from 'react';
import Messages from './Messages';
import UserContext from './UserContext'
import { useParams } from 'react-router';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const Checkout = () => {


  // get json data from LocalStorage to validate if the userId is in the list
  var jsonObj = JSON.parse(localStorage.getItem("userData"))
  const user = JSON.parse(sessionStorage.getItem("userId"));
  var userInfo = jsonObj[user];
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();


  const [message, setMessage] = useState();


  // get userToken and cart from <UserContext.Provider value={[token, userIndex, setUserIndex, cart, setCart, productId, setProductId]} >
  const userToken = useContext(UserContext)[0];
  const cart = useContext(UserContext)[3];

  const { id } = useParams();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${cart}`);
      const data = await response.json();
      setProduct(data);
    }
    getProduct();
  }, [id]);

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    // TODO: implement order saving logic
    setMessage("success");
    setTimeout(() => {
      navigate("/");
    }, 1500)

  }

  return (
    <>
      <div className="container px-0" style={{ marginTop: "120px" }}>
        <Messages message={message} />
        <h1>Checkout</h1>
        <div className="row no-gutters">
          <div className="col-12 col-sm-6 col-md-8">
            <form onSubmit={handleSubmit}>
              <label>First Name</label>
              <input className="form-control" type="text" name="first" value={userInfo ? userInfo.firstName : ''} required onChange={(e)=>setFirstName(e.target.value)} /> <br/>
              <label>Last Name</label>
              <input className="form-control" type="text" name="last"  value={userInfo ? userInfo.lastName : ''} required onChange={(e)=>setLastName(e.target.value)} /> <br/>
              <label>Address</label>
              <input className="form-control" type="text" name="address" value={userInfo ? userInfo.address : ''} onChange={(e)=>setAddress(e.target.value)} /> <br/>
              <label>City</label>
              <input className="form-control" type="text" name="city" value={userInfo ? userInfo.city : ''} onChange={(e)=>setCity(e.target.value)} /> <br/>
              <label>State</label>
              <input className="form-control" type="text" name="state" value={userInfo ? userInfo.state : ''} onChange={(e)=>setState(e.target.value)} /> <br/>
              <label>Zip</label>
              <input className="form-control" type="text" name="zip" value={userInfo ? userInfo.zip : ''} onChange={(e)=>setZip(e.target.value)} /> <br/>
              <Card >
                <Card.Header as="h5">Payment Methods</Card.Header>
                <Card.Body>
                  <input type="radio" id="PP" name="radio" value="PP"/>
                  <label htmlFor="PP"> PayPal</label><br/>
                  <input type="radio" id="checkmo" name="radio" value="checkmo"/>
                  <label htmlFor="checkmo"> Check Money Order</label><br/>
                </Card.Body>
              </Card>
              <button className="btn btn-primary">Place Order</button>
            </form>
          </div>
          <div className="col-6 col-md-4">
            <Card product={product}>
              <Card.Header as="h5">Products</Card.Header>
              <Card.Body>
                <img id="main-image" alt="product" src={product.image} width="100" />
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  ${product.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout;