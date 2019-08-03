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
