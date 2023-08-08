import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING_AUTH, USER_LOADED } from "../actions/types";
import { toast } from "react-toastify";

// Intial State
const intialState = {
   token: localStorage.getItem('token_poo'),
   isAuthenticated: null,
   loadingAuth: true,
   user: null,
};

// Reducers REDUX
export default function reducer(state = intialState, action) {
   const {
      type,
      payload
   } = action;
   switch (type) {

      case USER_LOADED:
         const { name } = payload;

         toast(`Welcome ${name}`);
         return {
            ...state,
            user: payload,
            isAuthenticated: true,
            loadingAuth: false
         }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         // Set Token in localstorage
         localStorage.setItem('token_poo', payload);
         return {
            ...state,
            token: payload,
            isAuthenticated: true,
            loadingAuth: false,
         };
      case SET_LOADING_AUTH:
         // console.log(payload)
         return {
            ...state,
            loadingAuth: payload
         }
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
         // Remove Token in localstorage
         localStorage.removeItem('token_poo');
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loadingAuth: false,
            user: null
         };
      default:
         return { ...state };
   }
}

