import { IncomingMessage } from "http";
import cookie from "cookie";

export default function parseCookies(req: IncomingMessage) {
  console.log(req.headers);
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
