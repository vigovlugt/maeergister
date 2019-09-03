import React from "react";
import App, { AppContext } from "next/app";
import * as CustomAppContext from "../src/components/Context/AppContext";
import getAccountType from "../src/server/auth";
import AccountType from "../src/models/AccountType";
import Layout from "../src/components/Layout/Layout";
import { withRouter } from "next/router";
import Head from "next/head";

import "../styles/custom.scss";

interface IProps {
  accountType: AccountType;
}

interface IState {
  accountType: AccountType;
}

class CustomApp extends App<IProps, {}, IState> {
  state = {
    accountType: AccountType.none
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window["accountType"] = this.props.accountType;
  }

  static async getInitialProps({
    Component,
    ctx,
    AppTree,
    router
  }: AppContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps({
      Component,
      ctx,
      AppTree,
      router
    });
    if (ctx.req) {
      let accountType = AccountType.none;
      if (!ctx.pathname.startsWith("/login")) {
        accountType = await getAccountType(ctx);
      }
      return { ...appProps, accountType };
    }

    return { ...appProps, accountType: window["accountType"] };
  }

  render() {
    const { Component, pageProps, accountType } = this.props;
    const useLayout = !this.props.router.pathname.startsWith("/login");
    return (
      <>
        <Head>
          <title>Maeergister Dashboard</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        </Head>
        <CustomAppContext.default.Provider value={{ accountType }}>
          {useLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <div>
              <Component {...pageProps} />
            </div>
          )}
        </CustomAppContext.default.Provider>
      </>
    );
  }
}

export default withRouter(CustomApp);
