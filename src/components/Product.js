import React, { useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import UserContext from './UserContext';


function Product() {

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  //const cart = useContext(UserContext)[3];
  const setCart = useContext(UserContext)[4];


  // Use fakestore api to get sample product details by its id
  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    getProduct();
  }, [id]);

  const ShowDetails = () => {
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
            <div>
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      <img id="main-image" alt="product" src={product.image} width="250" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="border p-4">
                    <div className="mt-4 mb-3">

                      <span className="text-muted text-capitalize"> in {product.category}</span>

                      <h5 className="text-uppercase">
                        {product.title}
                      </h5>

                      Rating {product.rating && product.rating.rate}
                      <i className="fa fa-star text-warning"></i>

                      <div className="price d-flex flex-row align-items-center">
                        <big className="display-6"><b>${product.price}</b></big>
                      </div>
                    </div>
                    <p className="text-muted">{product.description}</p>
                    <div className="cart mt-4 align-items-center"> <button className="btn btn-outline-dark text-uppercase mr-2 px-4" onClick={()=>setCart(product.id)}>Add to Cart</button> </div>
                  </div>
                </div>
              </div>
            </div>
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

export default Product