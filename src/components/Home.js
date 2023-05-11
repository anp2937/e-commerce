import React from 'react'
import { NavLink } from 'react-router-dom';
import Products from './Products';

const Home = () => {
  return (
    <>
      <div className="container px-0" style={{ marginTop: "120px" }}>
        <h1>Home Page</h1>
        <Products />
      </div>
    </>
  )
}

export default Home;