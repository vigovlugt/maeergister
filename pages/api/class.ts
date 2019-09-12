import { NextApiRequest, NextApiResponse } from "next";
import getConnection, { getTable } from "../../lib/database";
import { RowDataPacket } from "mysql";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>("select * from Classes");
  res.status(200).json({
    data: results
  });
};
