import reduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const store = configureStore({ reducer: rootReducer, middleware: [reduxThunk], devTools: true });

export default store;
