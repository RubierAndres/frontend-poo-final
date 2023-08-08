import React from "react";
import { useSelector } from "react-redux";
import OrderList from "../components/orders/Order.list";

const Orders = () => {
  const orders = useSelector((state) => state.orders.miOrders);

  return (
    <div>
      <h2>Mis compras</h2>
      <div>
        {orders.length > 0 ? (
          <>
            <OrderList />
          </>
        ) : (
          <div>Aún no tiene órdenes registradas</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
