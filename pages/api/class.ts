import { NextApiRequest, NextApiResponse } from "next";
import getConnection, { getTable } from "../../lib/database";
import { RowDataPacket, OkPacket } from "mysql";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    case "POST":
      handlePost(req, res);
      break;
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(
    "select *, RAND() as 'Students' from Classes"
  );
  res.status(200).json({
    data: results
  });
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const con = await getConnection();
  const { name } = JSON.parse(req.body);
  const classObj = { Name: name };
  const [insertResult] = await con.query<OkPacket>(
    "insert into Classes set ?",
    classObj
  );
  const [results] = await con.query<RowDataPacket[]>(
    "select *, 0 as 'Students' from Classes where Id = ?",
    [insertResult.insertId]
  );
  res.status(200).json({
    data: results
  });
};
