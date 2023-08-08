import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../data/actions";
import CartItem from "./Cart.item";
import { FaCartPlus } from "react-icons/fa";

const Cart = () => {
  const cart = useSelector((state) => state.products.cart);
  const pedidos = useSelector((state) => state.orders.miOrders);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleComprar = () => {
    let noPagados = pedidos.filter((e) => !e.paid);
    if (noPagados.length > 0) {
      toast.warning(
        "Tiene pedidos no pagados. Páguelos o elimínelos antes de realizar uno nuevo"
      );
      navigate("/user");
    } else {
      if (isAuth) {
        navigate(`/order/envio`);
      } else {
        toast.warning("Inicia sesión para poder comprar");
        navigate("/login");
      }
    }
  };

  return (
    <div className="container-center">
      <div className="container d-flex flex-column">
        <h2 className="text-light fst-italic">Carrito de Compras</h2>
        {cart.length ? (
          <div className="bg-light rounded-15 pb-2 pe-3 ps-3">
            <table className="table stable striped align-middle">
              <thead>
                <tr>
                  <td colSpan={"2"}>Producto</td>
                  <td>Precio Unitario</td>
                  <td>Cantidad</td>
                  <td>Subtotal</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <CartItem key={index} data={item} />
                ))}
              </tbody>
            </table>
            <nav className="d-grid justify-content-center d-md-flex gap-3">
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(clearCart())}
              >
                Vaciar Carrito
              </button>
              <button className="btn btn-primary" onClick={handleComprar}>
                Comprar
              </button>
            </nav>
            <div className="mt-3 mb-3">
              <span className="fw-bold h5">Precio Total: $ </span>
              {Math.round(
                cart.reduce((prev, e) => prev + e.price * e.quantity, 0) * 100
              ) / 100}
            </div>
          </div>
        ) : (
          <div>
            <span className="text-light h3 mt-6 fst-italic">
              Aún no ha guardado productos en el carrito
            </span>
            <br />
            <button
              className="btn btn-success addCart pb-4 pe-3 ps-3 rounded-15"
              onClick={() => navigate("/")}
            >
              <div>
                <FaCartPlus />
                <br />
                <h3>Añadir un nuevo producto</h3>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
