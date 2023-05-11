import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import MyAccount from './components/MyAccount';
import Register from './components/Register';
import Products from './components/Products';
import Product from './components/Product';
import Login from './components/Login';
import Item from './components/Cart';
import Checkout from './components/Checkout';
import { Route, Routes} from 'react-router-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {useState} from 'react';
import Navbar from './components/Navbar';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import UserContext from './components/UserContext';

function MyApp() {

  // token is for guest session
  var [token, setToken] = useState(sessionStorage.getItem("usertkn") ? sessionStorage.getItem("usertkn") : '');

  // userIndex = email - for storing in localstorage
  var [userIndex, setUserIndex] = useState(0);
  const [cart, setCart] = useState('');
  const [productId, setProductId] = useState('');


  return (
    <>
      <UserContext.Provider value={[token, userIndex, setUserIndex, cart, setCart, productId, setProductId]} >
        <Navbar token={token} setToken={setToken}/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/myAccount" element={<MyAccount />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login setToken={setToken} />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/cart" element={<Item />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

function App() {
  return (
    <Router>
      <MyApp />
    </Router>
  );
}

export default App;
