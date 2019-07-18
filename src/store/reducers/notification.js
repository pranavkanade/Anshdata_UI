import actionTypes from "../actionTypes";

const initialState = {
  error: null,
  warning: null,
  info: null,
  success: null
};

const reducer = (state = initialState, action) => {
  let resp = null;
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION_ERROR:
      resp = Object.assign({}, state, {
        error: action.data
      });
      console.log(
        "[ADD_NOTIFICATION_ERROR reducer] Storing the error : ",
        resp
      );
      return resp;
    default:
      return state;
  }
};

export default reducer;
