import {
   GET_ALL_USERS,
   GET_ALL_SALES,
   SET_LOADING_ADMIN
} from "../actions/types";
// import { toast } from "react-toastify";

// Intial State
const intialState = {
   users: null,
   loadingAdmin: false,
   sales: null
};

// Reducers REDUX
export default function reducer(state = intialState, action) {
   const {
      type,
      payload
   } = action;

   switch (type) {
      case SET_LOADING_ADMIN:
         return { ...state, loadingAdmin: payload };
      case GET_ALL_USERS:
         return { ...state, users: payload };
      case GET_ALL_SALES:
         return { ...state, sales: payload };
      default:
         return { ...state };
   }
}

