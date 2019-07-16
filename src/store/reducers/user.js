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
      console.log("[Reducer Sign IN/UP] updated store : ", resp);
      setADStateToLocalStorage({ user: resp });
      return resp;
    case actionTypes.SIGN_OUT:
      resp = Object.assign({}, state, initialState);
      removeADStateFromLocalStorage();
      return resp;
    case actionTypes.USER_VERIFY:
      console.log("[USER VERIFY reducer] data recieved : ", action.data);
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
