import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  setADStateToLocalStorage,
  getADStateFromLocalStorage
} from "../utils/localStorage";
import actionTypes from "./actionTypes";

const initialPlatformState = {
  user: null,
  authToken: null,
  isAuthenticated: false
};

export const adReducer = (state = initialPlatformState, action) => {
  let resp = null;
  switch (action.type) {
    case actionTypes.SIGN_IN:
    case actionTypes.SIGN_UP:
      resp = Object.assign({}, state, {
        user: action.data.user,
        authToken: action.data.token,
        isAuthenticated: true
      });
      console.log("[Reducer Sign IN/UP] updated store : ", resp);
      setADStateToLocalStorage(resp);
      return resp;
    case actionTypes.SIGN_OUT:
      resp = Object.assign({}, state, initialPlatformState);
      setADStateToLocalStorage(resp);
      return resp;
    default:
      return state;
  }
};

// Actions
export const storeUserSignedIn = data => {
  console.log("[Sign in action] Trying to store user: ", data);
  return { type: actionTypes.SIGN_IN, data: data };
};

export const storeUserSignedUp = data => {
  console.log("[Sign up action] Trying to store user: ", data);
  return { type: actionTypes.SIGN_UP, data: data };
};

export const storeUserSignedOut = () => {
  return { type: actionTypes.SIGN_OUT };
};

export function initializeADStore(initialState = initialPlatformState) {
  return createStore(
    adReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
