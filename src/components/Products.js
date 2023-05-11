import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from 'react-router-dom';
import UserContext from './UserContext';

function Products() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(data);

    // get product list from fakestore api.
    useEffect(() => {
        let componentMounted = true;
        const getProdcuts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            if (componentMounted) {
                const data = await response.json();
                setData(data);
                setFilter(data);
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProdcuts();
    }, []);


    // filter products by categories
    const filterProduct = (category) => {
        const updateList = data.filter((x) => x.category === category);
        setFilter(updateList);
    }

    const ShowProducts = () => {
        return (
            <>
                <ul className="nav" style={{ top: "80px" }}>
                    <li onClick={() => setFilter(data)}>All</li>
                    <li onClick={() => filterProduct("women's clothing")}>Women's Clothing</li>
                    <li onClick={() => filterProduct("men's clothing")}>Men's Clothing</li>
                    <li onClick={() => filterProduct("jewelery")}>Jewelery</li>
                    <li onClick={() => filterProduct("electronics")}>Electronics</li>
                </ul>

                <div className="py-md-3">
                    <div className="row">
                        {filter.map((product) => {
                            return (
                                <div className="col-6 col-md-6 col-lg-4 mb-3" key={product.id}>

                                    <div className="card h-100">
                                        <img src={product.image} className="m-3" style={{ height: "300px", width: "auto", objectFit: "contain" }} alt={product.title} />
                                        <div className="m-3 mb-0">
                                            <small className="card-title">{product.title.substring(0, 50)}...</small>
                                        </div>
                                        <div style={{ marginTop: "auto" }}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="m-3"><b>${product.price}</b></div>
                                                <NavLink className="stretched-link" to={`/product/${product.id}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <ShowProducts />
            </div>
        </div>
    )
}

export default Products