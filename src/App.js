import React from "react";
// redux config
import { Provider } from 'react-redux';
import store from './data/store'
// routes config
import AppRoutes from './app.routes';
import { useEffect } from 'react';
import { loadUser, getAllProducts, setLoadingAuth, getAllOrdersByUser, getAllCategories, orderProducts } from './data/actions';

function App() {

  useEffect(() => {
    // Si hay un token solicito la info de usuario
    if (localStorage.token_poo) {
      store.dispatch(loadUser());
      store.dispatch(getAllOrdersByUser());
    } else {
      // Sino, le pongo el loading en false
      store.dispatch(setLoadingAuth(false));
    }
  }, []);

  useEffect(() => {
    store.dispatch(getAllProducts());
    store.dispatch(getAllCategories());
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store} >
        <AppRoutes />
      </Provider>
    </React.StrictMode>
  );
}

export default App;