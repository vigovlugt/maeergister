import { IncomingMessage } from "http";
import cookie from "cookie";

export default function parseCookies(req: IncomingMessage) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
