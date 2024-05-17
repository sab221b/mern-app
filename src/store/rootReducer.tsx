// reducers/index.js
import { combineReducers } from 'redux';
import { reducer as featureReducer } from './reducers/featureSlice';
import { reducer as userReducer } from './reducers/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  feature: featureReducer,
  // Add more reducers here
});

export default rootReducer;
