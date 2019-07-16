// import React from "react";
import { initializeADStore } from "./store";
import {
  getADStateFromLocalStorage,
  setADStateToLocalStorage
} from "../utils/localStorage";

const isServer = typeof window === "undefined";

export function getOrCreateStore(initialState) {
  //Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeADStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  const localADState = getADStateFromLocalStorage();
  let store = null;
  if (localADState === undefined) {
    store = initializeADStore(initialState);
    setADStateToLocalStorage(store.getState());
  } else {
    store = initializeADStore(localADState);
  }

  return store;
}

// export default App => {
//   return class AppWithRedux extends React.Component {
//     static async getInitialProps(appContext) {
//       // Get or Create the store with 'undefined' as initialState
//       // This allows you to get a custom default initial state
//       const reduxStore = getOrCreateStore();

//       // Provide the store to getInitialProps of pages
//       appContext.ctx.reduxStore = reduxStore;

//       let appProps = {};

//       if (typeof App.getInitialProps === "function") {
//         appProps = await App.getInitialProps(appContext);
//       }

//       return {
//         ...appProps,
//         initialData: reduxStore.getState()
//       };
//     }

//     constructor(props) {
//       super(props);
//       this.reduxStore = getOrCreateStore(props.initialData);
//     }

//     render() {
//       return <App {...this.props} reduxStore={this.reduxStore} />;
//     }
//   };
// };
