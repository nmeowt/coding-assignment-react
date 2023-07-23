import { IAction, IAppState } from "client/src/interface";
import { UPDATE_USER } from "../actions/app";


const defaultState: IAppState = {
  users: [],
  loading: true,
}

function appReducer(
  state = defaultState,
  action: IAction<any>
) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
      }
    default:
      return state;
  }
}

export default appReducer;