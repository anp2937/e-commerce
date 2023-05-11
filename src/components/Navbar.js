import React, {useState, useContext, useEffect} from 'react'
import UserContext from './UserContext'
import { NavLink } from 'react-router-dom';
import Login from './Login'
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';


const Navbar = (props) => {

  const [greeting, setGreeting] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const Menu = ()=>{
    if(props.token) {
      setGreeting(true);
      return(
        <Dropdown.Menu>
          <Dropdown.Item href="/myaccount">My Account</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => {
            sessionStorage.clear();
            props.setToken(null);
            setGreeting(false);
            navigate("/")
          }}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      )
    } else {
      return (
        <Dropdown.Menu>
          <Dropdown.Item href="/login">Log In</Dropdown.Item>
          <Dropdown.Item href="/register">Register</Dropdown.Item>
        </Dropdown.Menu>
      )
    }
  }

  const cart = ()=> {
    navigate("./cart");
  }

  return (
    <div>
      <nav className="navbar bg-light fixed-top shadow">
        <div className="container-fluid container">
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                <i className="fas fa-user-circle"></i>
              </Dropdown.Toggle>
              <Menu />
            </Dropdown>
            <div>{greeting && <span> Welcome customer {user[0]}</span>}</div>
          </div>
          <NavLink to="/">
            <img src="/logo.png" alt="logo" style={{ height: "50px" }} />
          </NavLink>
          <button className="navbar-toggler" type="button" onClick={cart}>
            <i className="fa fa-shopping-cart"></i>
          </button>
          {/*Use Bootstrap sidebar Nav menu*/}
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" >
            <div className="offcanvas-header">
              <NavLink to="/">
                <img src="/logo.png" alt="logo" style={{ height: "50px" }} />
                <hr/>
              </NavLink>
              <Menu />
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
