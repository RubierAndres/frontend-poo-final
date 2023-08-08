import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "./Order.item";

const OrderList = () => {
  const orders = useSelector((state) => state.orders.miOrders);

  return (
    <table className="table align-middle table-bordered table-striped">
      <thead>
        <tr>
          <td className="h4">Fecha</td>
          <td className="h4">Productos</td>
          <td className="h4">Precio</td>
          <td className="h4">Estado</td>
          <td className="h4">Pagado</td>
          <td className="h4">Acción</td>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
