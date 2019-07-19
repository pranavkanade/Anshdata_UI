import {
  setADStateToLocalStorage,
  removeADStateFromLocalStorage
} from "../../utils/localStorage";
import actionTypes from "../actionTypes";

const initialState = {
  user: null,
  authToken: null,
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  let resp = null;
  switch (action.type) {
    case actionTypes.SIGN_IN:
    case actionTypes.SIGN_UP:
      resp = Object.assign({}, state, {
        user: action.data.user,
        authToken: action.data.token,
        isAuthenticated: true
      });
      setADStateToLocalStorage({ user: resp });
      return resp;
    case actionTypes.SIGN_OUT:
      resp = Object.assign({}, state, initialState);
      setADStateToLocalStorage({ user: resp });
      return resp;
    case actionTypes.USER_VERIFY:
      resp = Object.assign({}, state, {
        authToken: action.data.token
      });
      setADStateToLocalStorage({ user: resp });
      return resp;
    default:
      return state;
  }
};

export default reducer;
