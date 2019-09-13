import React from "react";
import App, { AppContext } from "next/app";
import * as CustomAppContext from "../components/Context/AppContext";
import getAccountType from "../lib/auth";
import AccountType from "../models/AccountType";
import Layout from "../components/Layout/Layout";
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
    accountType: AccountType.None
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
      let accountType = AccountType.None;
      if (!ctx.pathname.startsWith("/login")) {
        accountType = await getAccountType(ctx);
      }
      return { ...appProps, accountType };
    }

    return { ...appProps, accountType: window["accountType"] };
  }

  render() {
    const { Component, pageProps, accountType } = this.props;
    const useLayout = !["/login", "/admin/database"].some(path =>
      this.props.router.pathname.startsWith(path)
    );
    return (
      <>
        <Head>
          <title>Maeergister Dashboard</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
