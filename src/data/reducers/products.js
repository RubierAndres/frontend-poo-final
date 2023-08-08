import { getCartLocalStorage } from "../../helpers/cartLocalStorage";
import {
   GET_ALL_PRODUCTS,
   SET_LOADING_PRODUCTS,
   FILTER_BY_CATEGORY,
   RESTART_FILTERS,
   GET_ALL_CATEGORIES,
   SET_OPTIONS,
   RESTART_PRODUCTS,
   SEARCH_BY_NAME,
   PAGINATE_COUNTRIES,
   SET_PAGE,
   ADD_TO_CART,
   CLEAR_CART,
   REMOVE_ALL_FROM_CART,
   REMOVE_ONE_FROM_CART,
   SET_PRODUCT_TO_EDIT,
   ORDER_PRODUCTS,
} from "../actions/types";
// import { toast } from "react-toastify";

// Intial State
const initialState = {
   products: [],
   categories: [],
   loadingProducts: false,
   paginatedProducts: [],
   currentProducts: [],
   currentPage: 1,
   filtered: [],
   productToEdit: null,
   cart: getCartLocalStorage(),
   options: {
      order: "asc",        // Puede ser: asc o desc
      orderBy: "name",     //Puede ser por: name, price
      category: "all"
   }
};

// Reducers REDUX
export default function reducer(state = initialState, action) {
   const {
      type,
      payload
   } = action;
   let filtered;

   switch (type) {
      // CARRITO
      case ADD_TO_CART: {
         let newItem = state.products.find(
            (product) => product._id === payload
         );
         let itemInCart = state.cart.find((item) => item._id === newItem._id);

         return itemInCart
            ? {
               ...state,
               cart: state.cart.map((item) =>
                  item._id === payload
                     ? { ...item, quantity: item.quantity + 1 }
                     : item
               ),
            }
            : {
               ...state,
               cart: [...state.cart, { ...newItem, quantity: 1 }],
            };
      }
      case REMOVE_ONE_FROM_CART: {
         let itemToDelete = state.cart.find((item) => item._id === payload);
         // console.log(itemToDelete + " " + payload);
         return itemToDelete.quantity > 1
            ? {
               ...state,
               cart: state.cart.map((item) =>
                  item._id === payload
                     ? { ...item, quantity: item.quantity - 1 }
                     : item
               ),
            }
            : {
               ...state,
               cart: state.cart.filter((item) => item._id !== payload),
            };
      }
      case REMOVE_ALL_FROM_CART: {
         return {
            ...state,
            cart: state.cart.filter((item) => item._id !== payload),
         };
      }
      case CLEAR_CART:
         return { ...state, cart: [] };
      // PRODUCTOS
      case SET_PRODUCT_TO_EDIT:
         return { ...state, productToEdit: payload };
      case SET_PAGE:
         return {
            ...state,
            currentPage: payload,
            currentProducts: state.paginatedProducts[payload]
         };
      case SET_LOADING_PRODUCTS:
         return { ...state, loadingProducts: payload };
      case GET_ALL_PRODUCTS:
         return { ...state, products: payload, filtered: payload, loadingProducts: false };
      case GET_ALL_CATEGORIES:
         return { ...state, loadingProducts: false, categories: payload };
      case SET_OPTIONS:
         // console.log(payload)
         return { ...state, options: { ...state.options, ...payload } };
      case FILTER_BY_CATEGORY:
         filtered = [...state.products];
         filtered = filtered.filter(e => e.category === payload);
         return { ...state, filtered };
      case SEARCH_BY_NAME:
         return { ...state, filtered: payload, loadingProducts: false };
      case RESTART_FILTERS:
         return { ...state, options: initialState.options };
      case RESTART_PRODUCTS:
         return { ...state, filtered: state.products };
      case PAGINATE_COUNTRIES:
         filtered = [...state.filtered];
         let paginatedProducts = [];

         if (filtered.length > 0) {
            while (filtered.length > 0) {
               // Poniendo de 10 en 10 cada página
               paginatedProducts.push(filtered.splice(0, 10))
            }
         }
         // Cada que se paginan los productos también establezco la pagina actual como 1
         return { ...state, paginatedProducts, currentProducts: paginatedProducts[0], currentPage: 1 };
      case ORDER_PRODUCTS:
         const { order, orderBy } = state.options;
         // console.log(state);
         filtered = [...state.filtered];

         if (orderBy === "name") {
            if (order === "asc") {
               filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
               return { ...state, filtered };
            } else {
               filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
               return { ...state, filtered };
            }
         } else {
            if (order === "asc") {
               filtered = filtered.sort((a, b) => a.price - b.price);
               return { ...state, filtered };
            } else {
               filtered = filtered.sort((a, b) => b.price - a.price);
               return { ...state, filtered };
            }
         }
      default:
         return { ...state };
   }
}

