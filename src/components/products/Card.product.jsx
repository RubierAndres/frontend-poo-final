import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, delFromCart } from "../../data/actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CardProduct = ({ product }) => {
  const { name, photo, price, description, _id, quantity } = product;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);
  const [inCart, setInCart] = useState(cart.find((e) => e._id === _id));

  const handleAddCart = (e) => {
    dispatch(addToCart(_id));
    setInCart(true);
  };

  const handleRemoveFromCart = (e) => {
    dispatch(delFromCart(_id, true));
    setInCart(false);
  };

  return (
    <div className="col-md-3" key={product._id}>
      <div className="card mt-4 mb-4 ms-3 rounded-15">
        <div className="card-header">
          <Link style={{ textDecoration: "none" }} to={`/product/${_id}`}>
            <h5 className="textToReduce">{name}</h5>
          </Link>
          <span className="badge rounded-15 bg-success">$ {price}</span>
        </div>
        <div className="card-body">
          <img className="img-fluid imagen" src={photo} alt="" />
          <div className="dropend b-grid">
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              id={"dropdownMenu" + _id}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="textToReduce">Descripcion</span>
            </button>
            <ul
              className="dropdown-menu bg-secondary"
              aria-labelledby={"dropdownMenu" + _id}
            >
              <p className="ps-2 pe-2 text-light text-justify">{description}</p>
            </ul>
          </div>
        </div>
        <div className="card-footer">
          {quantity === 0 ? (
            <button
              className="btn btn-warning"
              onClick={() => toast.warn("Producto agotado")}
            >
              Agotado
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={inCart ? handleRemoveFromCart : handleAddCart}
            >
              <span className="textToReduce">
                {inCart ? "Quitar del carrito" : "Añadir al carrito"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
