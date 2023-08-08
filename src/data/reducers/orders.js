import {
   CLEAR_ORDER,
   CREATE_ORDER,
   GET_ORDERS_BY_USER,
   SET_LOADING_ORDERS,
} from "../actions/types";
// import { toast } from "react-toastify";

// Intial State
const intialState = {
   miOrders: [],
   loadingOrders: false,
   createdOrder: null
};

// Reducers REDUX
export default function reducer(state = intialState, action) {
   const {
      type,
      payload
   } = action;

   switch (type) {
      case CLEAR_ORDER:
         return { ...state, createdOrder: null };
      case SET_LOADING_ORDERS:
         return { ...state, loadingOrders: payload };
      case CREATE_ORDER:
         return { ...state, createdOrder: payload };
      case GET_ORDERS_BY_USER:
         return { ...state, miOrders: payload };
      default:
         return { ...state };
   }
}

