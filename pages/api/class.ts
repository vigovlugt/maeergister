import { NextApiRequest, NextApiResponse } from "next";
import { getTable } from "../../src/server/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    data: await getTable("Class")
  });
};
