// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Import your combined reducers

const appStore = configureStore({
  reducer: {
    app: rootReducer,
  },
})

export default appStore;
