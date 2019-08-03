import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import MyAppLayout from "../src/Containers/App";
import { getOrCreateStore } from "../src/store/withStore";
import Head from "../src/Components/app/head";

import NProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", url => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class AdApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head />
        <Provider store={getOrCreateStore()}>
          <MyAppLayout>
            <Component {...pageProps} />
          </MyAppLayout>
        </Provider>
      </Container>
    );
  }
}

export default AdApp;
