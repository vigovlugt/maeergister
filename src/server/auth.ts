import { NextPageContext } from "next";
import parseCookies from "./cookie";
import jwt from "jsonwebtoken";
import AccountType from "../models/AccountType";
import IAccessToken from "../models/AccessToken";

export default function getAccountType(ctx: NextPageContext): AccountType {
  const cookies = parseCookies(ctx.req);
  console.log(cookies);
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
  return AccountType.none;
}
