import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import { getOrCreateStore } from "../src/store/withStore";
import Head from "../src/Components/app/head";

class AdApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const store = getOrCreateStore();
    ctx.store = store;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head />
        <Provider store={getOrCreateStore()}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default AdApp;
