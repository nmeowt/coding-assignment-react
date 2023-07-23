import { combineReducers } from 'redux';
import app from './app';

export const handleReducer = (listHandler: any, state: any, action: any) => {
  if (listHandler[action.type]) {
    return listHandler[action.type](state, action.payload);
  }

  return { ...state };
};

const rootReducer = combineReducers({ app });

export default rootReducer;
