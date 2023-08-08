// combine reducers me permite unir todos los reducers que necesite
import { combineReducers } from 'redux';
import auth from './auth'
import products from './products'
import orders from './orders'
import admin from './admin'

// le paso por argumento todos los reducers creados que desee unir
export default combineReducers({
   auth,
   products,
   orders,
   admin
});