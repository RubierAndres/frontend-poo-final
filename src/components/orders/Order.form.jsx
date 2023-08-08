import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../data/actions";
import FormInput from "../inputs/input.component";
import Loader from "../loader/Loader";

const initialState = {
  country: "",
  city: "",
  address: "",
  reference: "",
};

const validateForm = (form) => {
  const { country, city, address, reference } = form;
  const errors = {};

  if (!country) {
    errors.country = "Campo requerido";
  }
  if (!city) {
    errors.city = "Campo requerido";
  }
  if (!address) {
    errors.address = "Campo requerido";
  }
  if (!reference) {
    errors.reference = "Campo requerido";
  }

  return errors;
};

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const cart = useSelector((state) => state.products.cart);
  const loadingOrder = useSelector((state) => state.orders.loadingOrders);
  const createdOrder = useSelector((state) => state.orders.createdOrder);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };

    setForm(newForm);
    setErrors(validateForm(newForm));
  };

  const handleCancelar = (e) => {
    navigate("/");
    toast.info("Se ha cancelado la orden");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentErrors = validateForm(form);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length) {
      toast.warn("El formulario contiene errores");
    } else {
      const order = {
        ...form,
        products: cart.map((e) => ({
          productId: e._id,
          quantity: e.quantity,
        })),
      };
      dispatch(createOrder(order));
    }
  };

  useEffect(() => {
    if (createdOrder) {
      navigate(`/order/${createdOrder._id}`);
    }
  }, [loadingOrder, createdOrder, navigate]);

  return (
    <div className="container-center">
      <div className=" container card">
        <h2>Productos a comprar</h2>
        {cart.length && (
          <table className="table align-middle table-striped table-bordered">
            <thead>
              <tr>
                <td>ID</td>
                <td>Detalle</td>
                <td>Cantidad</td>
                <td>Precio Unitario</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {cart.length &&
                cart.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td>{e._id}</td>
                      <td>{e.name}</td>
                      <td>{e.quantity}</td>
                      <td>{e.price}</td>
                      <td>{e.price * e.quantity}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {loadingOrder && <Loader />}
        <span className="h3 pt-2 mt-2 border-top border-4 border-primary" id="Productos">
          Dirección de envío
        </span>
        <form className="card-body row" onSubmit={handleSubmit}>
          <div className="form col-sm-6 mb-3">
            <FormInput
              type={"text"}
              title={"País"}
              name={"country"}
              placeholder="Ecuador"
              value={form.country}
              handleChange={handleChange}
            />
            {errors.country && <span className="badge bg-danger">{errors.country}</span>}
          </div>
          <div className="form col-sm-6 mb-3">
            <FormInput
              type={"text"}
              title={"Ciudad"}
              name={"city"}
              placeholder="Loja"
              value={form.city}
              handleChange={handleChange}
            />
            {errors.city && <span className="badge bg-danger">{errors.city}</span>}
          </div>
          <div className="form col-sm-6 mb-3">
            <FormInput
              type={"text"}
              title={"Dirección"}
              name={"address"}
              placeholder="Av. Occidental y Luis Crespo"
              value={form.address}
              handleChange={handleChange}
            />
            {errors.address && <span className="badge bg-danger">{errors.address}</span>}
          </div>
          <div className="form col-sm-6 mb-3">
            <FormInput
              type={"text"}
              title={"Referencia"}
              name={"reference"}
              placeholder="Junto a la tienda Camila..."
              value={form.reference}
              handleChange={handleChange}
            />
            {errors.reference && <span className="badge bg-danger">{errors.reference}</span>}
          </div>
          <div className="btn-group gap-3">
            <button className="btn btn-primary" onClick={handleSubmit}>Guardar datos</button>
            <button className="btn btn-danger" onClick={handleCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
