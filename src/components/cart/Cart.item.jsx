import { useDispatch } from "react-redux";
import { addToCart, delFromCart } from "../../data/actions";

const CartItem = ({ data }) => {
  let { _id, name, price, quantity, photo } = data;
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <img style={{ width: "80px" }} src={photo} alt={name} />
      </td>
      <td className="h5">{name}</td>
      <td className="h5">${price}</td>
      <td>
        <button className="btn btn-danger" onClick={() => dispatch(delFromCart(_id, false))}>  -  </button>
        <span className="align-middle h5">{"  " + quantity + "  "}</span>
        <button className="btn btn-primary" onClick={() => dispatch(addToCart(_id))}> + </button>
      </td>
      <td className="h5">${Math.round(price * quantity * 100) / 100}</td>
      <td>
        <button className="btn btn-danger" onClick={() => dispatch(delFromCart(_id, true))}>Quitar</button>
      </td>
    </tr>
  );
};

export default CartItem;
