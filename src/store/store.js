import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

import userReducer from "./reducers/user";
import coursesReducer from "./reducers/courses";
import notificationReducer from "./reducers/notification";

const rootReducer = combineReducers({
  user: userReducer,
  crs: coursesReducer,
  note: notificationReducer
});

const sagaMiddleware = createSagaMiddleware();

export function initializeADStore(initialState) {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware()));
  }
  let store;
  if (initialState !== null && initialState !== undefined) {
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
