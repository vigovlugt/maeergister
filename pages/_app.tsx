import React from "react";
import App, { AppContext } from "next/app";
import * as CustomAppContext from "../src/components/Context/AppContext";
import getAccountType from "../src/server/auth";
import AccountType from "../src/models/AccountType";

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
    return (
      <CustomAppContext.default.Provider value={{ accountType }}>
        <Component {...pageProps} />;
      </CustomAppContext.default.Provider>
    );
  }
}

export default CustomApp;
