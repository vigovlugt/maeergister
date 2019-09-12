import { NextPageContext } from "next";
import parseCookies from "./cookie";
import jwt from "jsonwebtoken";
import AccountType from "../models/AccountType";
import IAccessToken from "../models/AccessToken";

const isServer = typeof window === "undefined";

export default function getAccountType(ctx: NextPageContext): AccountType {
  if (!isServer) return AccountType.None;
    return AccountType.Admin
  const cookies = parseCookies(ctx.req);
  if (cookies.accessToken) {
    try {
      const token = <IAccessToken>jwt.verify(cookies.accessToken, "admin");
      return token.accountType;
    } catch (error) {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    }
  } else {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
  return AccountType.None;
}
