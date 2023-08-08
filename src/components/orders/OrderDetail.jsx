import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASEURL } from "../../assets/constants";
import { clearOrder } from "../../data/actions";
import getHeaderToken from "../../helpers/getHeaderToken";
import Loader from "../loader/Loader";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const createdOrder = useSelector((state) => state.orders.createdOrder);
  const dispatch = useDispatch();

  const {
    address,
    city,
    country,
    createdAt,
    paid,
    products = [],
    reference,
    status,
    totalAmount,
    _id,
  } = order || {};

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(
          `${BASEURL}/order/${id}`,
          getHeaderToken()
        );
        setOrder({ ...data });
      } catch (err) {
        toast.error("No se ha podido cargar la orden");
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [id]);

  useEffect(() => {
    createdOrder && dispatch(clearOrder());
  }, [id, createdOrder, dispatch]);

  return loading ? (
    <Loader />
  ) : order ? (
    <div className="container-center d-grid">
      {paid && status === "PENDING" && (
        <div className="h3 text-light mb-4">
          Su pedido será enviado en las próximas 72 horas posteriores a la
          compra.
        </div>
      )}
      <div className="container bg-light mb-4 rounded-15">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <td colSpan={2}>
                <h3>Detalles del pedido</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h5>ID del pedido</h5>
              </td>
              <td>
                <span>{_id}</span>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Fecha</h5>
              </td>
              <td>
                <p>{createdAt.split("T")[0]}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Estado</h5>
              </td>
              <td>
                <p>{paid ? "Pagado" : "No pagado"}</p>
              </td>
            </tr>
            {paid && (
              <tr>
                <td>
                  <h5>Entrega</h5>
                </td>
                <td>
                  <p>{status === "PENDING" ? "Pendiente" : "Entregada"}</p>
                </td>
              </tr>
            )}
            <tr>
              <td colSpan={2}>
                <h4>Dirección de envío:</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h5>País</h5>
              </td>
              <td>
                <p>{country}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Ciudad</h5>
              </td>
              <td>
                <p>{city}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Dirección</h5>
              </td>
              <td>
                <p>{address}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Referencia</h5>
              </td>
              <td>
                <p>{reference}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {!paid && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(`/payment/${id}?amount=${totalAmount}`)
                    }
                  >
                    Pagar
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <div className="container bg-light rounded-15">
          <h3>Productos comprados</h3>
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <td className="h5">ID</td>
                <td className="h5">Producto</td>
                <td className="h5">Precio Unitario</td>
                <td className="h5">Cantidad</td>
                <td className="h5">Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products.map((prod) => {
                  return (
                    <tr key={prod._id}>
                      <td>{prod._id}</td>
                      <td>{prod.name}</td>
                      <td>{prod.price}</td>
                      <td>{prod.quantity}</td>
                      <td>
                        {Math.round(prod.quantity * prod.price * 100) / 100}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={"5"}>
                    Es posible que sus productos se hayan eliminado
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={"4"} className="h4">
                  Total
                </td>
                <td className="fw-bold">${totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div>No hay datos</div>
  );
};

export default OrderDetail;
