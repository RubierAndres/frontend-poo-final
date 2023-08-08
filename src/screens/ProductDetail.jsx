import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASEURL } from "../assets/constants";
import Loader from "../components/loader/Loader";
import { addToCart, delFromCart } from "../data/actions";

const Productdetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { name, description, price, category, quantity, photo } = product || {};
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);
  const [inCart, setInCart] = useState(cart.find((e) => e._id === id));

  const handleAddCart = (e) => {
    dispatch(addToCart(id));
    setInCart(true);
  };

  const handleRemoveFromCart = (e) => {
    dispatch(delFromCart(id, true));
    setInCart(false);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`${BASEURL}/product/${id}`);
        setProduct({ ...data });
      } catch (err) {
        toast.error("No se ha obtener la información del producto");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  return loading ? (
    <Loader />
  ) : product ? (
    <div className="container-center">
      <div className="container card  rounded-15 bg-light">
        <div className="row">
          <div className="col-md-auto div-img">
            <img src={photo} alt={name} />
          </div>
          <div className="col d-flex">
            <table className="table table-striped table-bordered rounded-15 align-middle mt-3">
              <thead>
                <tr>
                  <td colSpan={2}>
                    <h2>{name}</h2>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="h3">Descripción:</td>
                  <td className="p">{description}</td>
                </tr>
                <tr>
                  <td className="h3">Precio:</td>
                  <td className="h5">{price}</td>
                </tr>
                <tr>
                  <td className="h3">Categoría:</td>
                  <td className="h5">{category.name}</td>
                </tr>
                <tr>
                  <td className="h3">Cantidad:</td>
                  <td className="h5">{quantity}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>
                    {quantity > 0 ? (
                      inCart ? (
                        <button
                          className="btn btn-primary"
                          onClick={handleRemoveFromCart}
                        >
                          Quitar del carrito
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={handleAddCart}
                        >
                          Añadir al carrito
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() =>
                          toast.warn(
                            "Ya no quedan más unidades en stock. Lamentamos las molestias"
                          )
                        }
                        className="btn btn-info"
                      >
                        Producto agotado
                      </button>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h3>404</h3>
      <div>Producto no encontrado</div>
    </div>
  );
};

export default Productdetail;
