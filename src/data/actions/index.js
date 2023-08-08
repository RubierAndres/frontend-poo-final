// ACCIONES REDUX
import axios from 'axios';
import { toast } from 'react-toastify';
import getHeaderToken from '../../helpers/getHeaderToken';
import {
   URL_REGISTER,
   URL_LOGIN,
   USER_GET_INFO,
   URL_GET_ALL_PRODUCTS,
   URL_GET_ORDERS_BY_USER,
   BASEURL
} from '../../assets/constants';
import {
   AUTH_ERROR,
   GET_ALL_PRODUCTS,
   GET_ORDERS_BY_USER,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_FAIL,
   REGISTER_SUCCESS,
   SET_LOADING_AUTH,
   SET_LOADING_ORDERS,
   SET_LOADING_PRODUCTS,
   USER_LOADED,
   ADD_TO_CART,
   CLEAR_CART,
   REMOVE_ALL_FROM_CART,
   REMOVE_ONE_FROM_CART,
   CREATE_ORDER,
   CLEAR_ORDER,
   GET_ALL_CATEGORIES,
   SET_PRODUCT_TO_EDIT,
   GET_ALL_USERS,
   GET_ALL_SALES,
   SET_LOADING_ADMIN,
   SEARCH_BY_NAME,
   SET_OPTIONS,
   ORDER_PRODUCTS,
   RESTART_PRODUCTS,
   FILTER_BY_CATEGORY,
   RESTART_FILTERS
} from './types';


// OBTENER INFORMACIÓN DEL USUARIO
export const loadUser = () => async (dispatch) => {
   // Set config
   const config = getHeaderToken();
   try {
      const res = await axios.get(USER_GET_INFO, config);
      dispatch({
         type: USER_LOADED,
         payload: res.data
      })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: AUTH_ERROR
      })
   }
}

// REGISTRAR UN NUEVO USUARIO
export const register = ({
   name,
   lastname,
   email,
   password,
   address
}) => async (dispatch) => {
   // Set body
   const body = {
      name,
      lastname,
      email,
      password,
      address
   };

   dispatch({
      type: SET_LOADING_AUTH
   })
   console.log("Body");
   console.log(body);
   try {
      // Response 
      const res = await axios.post(URL_REGISTER, body);

      console.log(res.data);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data.token
      })
      dispatch(loadUser())
      dispatch(getAllOrdersByUser())
   } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
         errors.map(error => toast.error(error.msg))
      } else {
         toast.error("No se ha podido crear su cuenta");
      }

      dispatch({
         type: REGISTER_FAIL
      })
   }
};

// LOGUEAR USUARIO
export const login = (body) => async (dispatch) => {
   dispatch({
      type: SET_LOADING_AUTH
   })
   try {
      // Response 
      const res = await axios.post(URL_LOGIN, body);
      // console.log(res.data.token);

      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data.token
      })
      dispatch(loadUser())
      dispatch(getAllOrdersByUser())
   } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
         const errors = err.response.data.errors
         console.log(errors);
         errors.forEach(error => toast.error(error.msg))
      } else {
         toast.error(err.response.data);
      }

      dispatch({
         type: LOGIN_FAIL
      })
   }
};


// CERRAR SESIÓN USUARIO
export const logout = () => {
   return {
      type: LOGOUT
   };
}

export const setLoadingAuth = (loading = true) => {
   return { type: SET_LOADING_AUTH, payload: loading }
}

// OBTENER TODOS LOS PRODUCTOS
export const getAllProducts = () => async (dispatch) => {
   // Seteo en true el loading
   dispatch({
      type: SET_LOADING_PRODUCTS,
      payload: true
   })
   // Realizo la petición a la API
   try {
      const res = await axios.get(URL_GET_ALL_PRODUCTS);
      // console.log(res.data);

      dispatch({
         type: GET_ALL_PRODUCTS,
         payload: res.data
      });
      dispatch(orderProducts());
   } catch (err) {
      toast.error("No se han podido cargar los productos");
      console.log(err);
      dispatch({
         type: SET_LOADING_PRODUCTS,
         payload: false
      })
   }
}

export const searchByName = (search) => async (dispatch) => {
   try {
      const { data } = await axios.get(
         `${BASEURL}/product/search?search=${search}`
      );
      // console.log(data);
      if (data.length === 0) {
         toast.info("No se hallaron resultados para su búsqueda");
         dispatch({ type: RESTART_FILTERS });
      } else {
         dispatch({ type: SEARCH_BY_NAME, payload: data });
         dispatch(orderProducts());
         dispatch(setOptions({ category: "all" }));
      }
   } catch (error) {
      console.log(error.response.data);
      toast.error("No se ha podido realizar la búsqueda");
   }
}

// 
export const setLoadingOrders = (loading = true) => {
   return { type: SET_LOADING_ORDERS, payload: loading }
}

// OBTENER TODAS LAS ÓRDENES DE UN USUARIO
export const getAllOrdersByUser = () => async (dispatch) => {
   try {
      // Seteo en true el loading
      dispatch(setLoadingOrders(true));
      // Realizo la petición a la API
      const res = await axios.get(URL_GET_ORDERS_BY_USER, getHeaderToken());
      // console.log(res.data);

      dispatch({
         type: GET_ORDERS_BY_USER,
         payload: res.data
      });
   } catch (err) {
      toast.error("No se han podido cargar los pedidos");
      console.log(err.response);
      dispatch({
         type: SET_LOADING_PRODUCTS,
         payload: false
      })
   } finally {
      dispatch(setLoadingOrders(false));
   }
}


export const addToCart = (id) => ({ type: ADD_TO_CART, payload: id });

export const delFromCart = (id, all = false) =>
   all
      ? { type: REMOVE_ALL_FROM_CART, payload: id }
      : { type: REMOVE_ONE_FROM_CART, payload: id };

export const clearCart = () => ({ type: CLEAR_CART });

export const createOrder = (order) => async (dispatch) => {
   try {
      dispatch(setLoadingOrders(true));
      const { data } = await axios.post(
         `${BASEURL}/order`,
         order,
         getHeaderToken()
      );
      console.table(data);
      dispatch(clearCart());
      dispatch(getAllOrdersByUser());
      return dispatch({ type: CREATE_ORDER, payload: data });
   } catch (error) {
      console.log(error.response);
   } finally {
      dispatch(setLoadingOrders(false));
   }
};


export const clearOrder = () => {
   return { type: CLEAR_ORDER };
}

export const deleteOrder = (id) => async (dispatch) => {
   try {
      await axios.delete(`${BASEURL}/order/${id}`, getHeaderToken());
      toast.info(`Orden ${id} eliminada exitosamente`);
      dispatch(getAllOrdersByUser());
   } catch (error) {
      console.log(error.response.data);
      toast.error("No se ha podido eliminar el pedido");
   }
}

// categories
export const getAllCategories = () => async (dispatch) => {
   try {
      const { data } = await axios.get(`${BASEURL}/category/all`);

      // console.log("en actions");
      // console.log(data);
      dispatch({ type: GET_ALL_CATEGORIES, payload: data });
   } catch (error) {
      console.log(error.response.data);
      toast.warning("No se han podido cargar las categorìas");
   }
}

export const deleteProduct = (id) => async (dispatch) => {
   try {
      await axios.delete(`${BASEURL}/product/${id}`, getHeaderToken());
      toast.info(`Producto ${id} eliminado`);
      dispatch(getAllProducts());
   } catch (error) {
      console.log(error.response.data);
      toast.error("No se ha podido eliminar el producto");
   }
}


export const updateProduct = (product) => async (dispatch) => {
   try {
      await axios.put(
         `${BASEURL}/product/${product._id}`,
         product,
         getHeaderToken()
      );
      toast.success(`Producto '${product.name}' actualizado`);
      dispatch(getAllProducts());
   } catch (error) {
      console.log(error.response.data);
      toast.error("No se ha podido actualizar el producto");
   }
}


export const createProduct = (product) => async (dispatch) => {
   try {
      await axios.post(
         `${BASEURL}/product`,
         product,
         getHeaderToken()
      );
      toast.success(`Producto creado`);
      dispatch(getAllProducts());
   } catch (error) {
      console.log(error.response.data);
      toast.error("No se ha podido crear el producto");
   }
}

export const setLoadingAdmin = (value = true) => ({ type: SET_LOADING_ADMIN, payload: value })

// ADMIN
export const getAllUsers = () => async (dispatch) => {
   try {
      dispatch(setLoadingAdmin());
      const { data } = await axios.get(
         `${BASEURL}/user/all`,
         getHeaderToken()
      );
      dispatch({ type: GET_ALL_USERS, payload: data });
   } catch (error) {
      console.log(error.response.data);
      toast.error("No se han podido cargar los usuarios");
   } finally {
      dispatch(setLoadingAdmin(false));
   }
}


export const getAllSales = () => async (dispatch) => {
   try {
      dispatch(setLoadingAdmin());
      const { data } = await axios.get(
         `${BASEURL}/order`,
         getHeaderToken()
      );
      dispatch({ type: GET_ALL_SALES, payload: data });
   } catch (error) {
      console.log(error.response.data);
      toast.error("No se han podido cargar los usuarios");
   } finally {
      dispatch(setLoadingAdmin(false));
   }
}

export const setProductToEdit = (product) => ({ type: SET_PRODUCT_TO_EDIT, payload: product })

export const setOptions = (newOptions) => {
   return { type: SET_OPTIONS, payload: newOptions };
}

export const orderProducts = () => {
   return { type: ORDER_PRODUCTS };
}

export const filterByCategory = (categoryId) => {
   return { type: FILTER_BY_CATEGORY, payload: categoryId };
}