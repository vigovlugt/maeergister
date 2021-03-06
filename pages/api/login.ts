import { NextApiRequest, NextApiResponse } from "next";
import getConnection from "../../lib/database";
import jwt from "jsonwebtoken";
import IAccessToken from "../../models/AccessToken";
import { RowDataPacket } from "mysql";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = JSON.parse(req.body);

  if (username && password) {
    const connection = await getConnection();
    const [results] = await connection.query<RowDataPacket[]>(
      `select * from Accounts where Username = ? and Password = ?`,
      [username, password]
    );
    if (results.length > 0) {
      const account = results[0];
      const accessToken: IAccessToken = {
        accountType: account.AccountType,
        id: account.Id
      };

      const jwtToken = jwt.sign(accessToken, "admin");
      const setCookie = cookie.serialize("accessToken", jwtToken, {
        httpOnly: true,
        maxAge: 999999,
        path: "/"
      });
      res.setHeader("Set-Cookie", setCookie);
      res.status(200).end();
    } else {
      returnInvalid(res);
    }
  } else {
    returnInvalid(res);
  }
};

function returnInvalid(res: NextApiResponse) {
  res.status(400).end();
}
