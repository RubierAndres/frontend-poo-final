import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "../../data/actions";

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createdAt, products, status, totalAmount, paid } = order;

  const handleClickDetail = () => {
    navigate(`/order/${order._id}`);
  };

  const handleClickEliminar = () => {
    dispatch(deleteOrder(order._id));
  };

  return (
    <tr>
      <td>{createdAt.split("T")[0]}</td>
      <td>
        {products.reduce((prev, current) => prev + current.quantity, 0)}{" "}
        artículos
      </td>
      <td>US${totalAmount}</td>
      <td>{status}</td>
      <td>{paid ? "Si" : "No"}</td>
      <td>
        <button className="btn btn-info me-2" onClick={handleClickDetail}>
          Ver detalle
        </button>
        <button className="btn btn-danger ms-2" onClick={handleClickEliminar}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default OrderItem;
