import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import UserContext from './UserContext'

function Item() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  // get data from <UserContext.Provider value={[token, userIndex, setUserIndex, cart, setCart, productId, setProductId]} >
  const cart = useContext(UserContext)[3];
  const setCart = useContext(UserContext)[4];

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${cart}`);
      const data = await response.json();
      setProduct(data);
    }
    getProduct();
  }, [id]);


  const ShowDetails = () => {

    function startCheckout () {
      navigate("/checkout");
    }
    return (
      <>
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <NavLink className="text-decoration-none text-dark" to={`/`}>
              <div className="d-flex align-items-center m-3">
                <i className="fa fa-long-arrow-left"></i>
                <span className="ml-1">&nbsp;Back</span>
              </div>
            </NavLink>
            <div className="title">
              <h2>Shopping Bag</h2> <br/>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th scope="col" className="border-0 bg-light">
                    <div className="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Remove</div>
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row" className="border-0">
                    <div className="p-2">
                      <img src={product.image} alt="" width="70" className="img-fluid rounded shadow-sm"/>
                        <div className="ml-3 d-inline-block align-middle">
                          <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle"> {product.title}</a></h5>
                        </div>
                    </div>
                  </th>
                  <td className="border-0 align-middle"><strong>{product.price}</strong></td>
                  <td className="border-0 align-middle"><strong>{product.qty}</strong></td>
                  <td className="border-0 align-middle"><a href="#" className="text-dark" onClick={()=>setCart('')}><i className="fa fa-trash"></i></a></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="cart mt-4 align-items-center"> <button className="btn btn-outline-dark text-uppercase mr-2 px-4" onClick={startCheckout}>Checkout</button> </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>
        <ShowDetails />
      </div>
    </>
  )
}

export default Item