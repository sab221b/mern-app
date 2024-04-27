// reducers/index.js
import { combineReducers } from 'redux';
import { reducer as productsReducer } from './reducers/productSlice';
import { reducer as userReducer } from './reducers/userSlice';

const rootReducer = combineReducers({
  product: productsReducer,
  user: userReducer,
  // Add more reducers here
});

export default rootReducer;
