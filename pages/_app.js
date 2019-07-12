import React from "react";
import App, { Container } from "next/app";

import Head from "../src/Components/app/head";

class AdApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

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
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default AdApp;
