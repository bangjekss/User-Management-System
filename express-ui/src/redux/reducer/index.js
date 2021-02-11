import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { userReducer } from './userReducer';
import { registerReducer } from './registerReducer';

export default combineReducers({
  productReducer,
  userReducer,
  registerReducer,
});
