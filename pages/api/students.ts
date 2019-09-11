import { NextApiRequest, NextApiResponse } from "next";
import { getTable } from "../../lib/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    data: await getTable("Students")
  });
};
