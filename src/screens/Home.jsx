import React from "react";
import { useSelector } from "react-redux";
import CardProduct from "../components/products/Card.product";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Filters from "../components/filters/Filters";

const Home = () => {
  const products = useSelector((state) => state.products.filtered);
  const cart = useSelector((state) => state.products.cart);
  const navigate = useNavigate();

  // console.log(products);
  return (
    <div className="container containerToReduce">
      <h1 className="text-light fw-bold fst-italic">Home</h1>
      <div>
        <Filters />
      </div>
      <div className="fixed-bottom text-end">
        <button
          onClick={() => navigate("/cart")}
          className="btn btn-primary position-relative me-4 mb-4"
          style={{ fontSize: "28px" }}
        >
          <FaShoppingCart />
          <span className="position-absolute top-0 start-120 translate-middle badge rounded-pill bg-danger">
            {cart.length}+
          </span>
        </button>
      </div>
      {products.length ? (
        <div className="row">
          {products.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
