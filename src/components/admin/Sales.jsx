import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASEURL } from "../../assets/constants";
import { deleteOrder, getAllSales } from "../../data/actions";
import getHeaderToken from "../../helpers/getHeaderToken";
import Loader from "../loader/Loader";

export const Sales = () => {
  const sales = useSelector((state) => state.admin.sales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  const handleChange = async (e, id) => {
    const { value } = e.target;

    try {
      await axios.put(
        `${BASEURL}/order/${id}`,
        { status: value },
        getHeaderToken()
      );
      toast.success(
        `Se ha marcado como ${value === "PENDING" ? "pendiente" : "entregada"}`
      );
      dispatch(getAllSales());
    } catch (err) {
      toast.error("No se ha podido editar la orden");
      console.log(err);
    }
  };

  return (
    <div className="container-center">
      <div className="container-fluid">
        {sales ? (
          <div className="bg-light mt-5 pt-2 rounded">
            <span className="h4 fst-italic">Ventas</span>
            <table className="table table-striped table-bordered mb-5 align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Informacion</th>
                  <th>Usuario</th>
                  <th>Direccion</th>
                  <th>Estado</th>
                  <th>Pagada</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => {
                  return (
                    <tr key={sale._id}>
                      <td>{sale._id.substring(7, 14)}</td>
                      <td>
                        <div
                          className="accordion accordion-flush"
                          _id="accordionFlushExample"
                        >
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              _id="flush-heading"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={"#flush-collapse-" + sale._id}
                                aria-expanded="false"
                                aria-controls={"flush-collapse-" + sale._id}
                              >
                                Informacion de la venta
                              </button>
                            </h2>
                            <div
                              id={"flush-collapse-" + sale._id}
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-heading"
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div className="accordion-body">
                                <table className="table table-striped table-hover table-bordered mb-5 align-middle">
                                  <thead>
                                    <tr className="table-light">
                                      <th>#</th>
                                      <th>Nombre Producto</th>
                                      <th>Precio</th>
                                      <th>Cantidad</th>
                                      <th>Precio final</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sale.products.length ? (
                                      sale.products.map((p) => {
                                        return (
                                          <tr key={p._id}>
                                            <td className="text-truncate td-width">
                                              {p._id}
                                            </td>
                                            <td>{p.name}</td>
                                            <td>
                                              {Math.round(p.price * 100) / 100}
                                            </td>
                                            <td>{p.quantity}</td>
                                            <td>
                                              {Math.round(
                                                p.price * p.quantity * 100
                                              ) / 100}
                                            </td>
                                          </tr>
                                        );
                                      })
                                    ) : (
                                      <tr>
                                        <td colSpan={"5"}>No hay productos</td>
                                      </tr>
                                    )}
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td colSpan={"4"}>Total</td>
                                      <td>{sale.totalAmount}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={"5"}>
                                        Pedido realizado el:{" "}
                                        {sale.createdAt.split("T")[0]}{" "}
                                        {
                                          sale.createdAt
                                            .split("T")[1]
                                            .split(".")[0]
                                        }
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{sale.user.name + " " + sale.user.lastname}</td>
                      <td>
                        {sale.city}, {sale.country}
                        <br />
                        {sale.address}
                        <br />
                        {sale.reference}
                      </td>
                      <td>
                        <select
                          name="stateProduct"
                          className="form-select"
                          onChange={(e) => handleChange(e, sale._id)}
                          value={sale.status}
                        >
                          <option value="PENDING">Pendiente</option>
                          <option value="COMPLETED">Entregado</option>
                        </select>
                      </td>
                      <td>{sale.paid ? "Si" : "No"}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            dispatch(deleteOrder(sale._id));
                            dispatch(getAllSales());
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
